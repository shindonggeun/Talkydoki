package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import com.ssafy.backend.domain.aichat.exception.AiChatErrorCode;
import com.ssafy.backend.domain.aichat.exception.AiChatException;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.openai.OpenAiCommunicationProvider;
import com.ssafy.backend.global.component.openai.dto.*;
import com.ssafy.backend.global.component.openai.repository.OpenAiRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


/**
 * AI 채팅 관련 기능을 구현하는 서비스 클래스.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AiChatServiceImpl implements AiChatService {

    private final AiChatHistoryRepository aiChatHistoryRepository;
    private final MemberRepository memberRepository;
    private final AiChatRoomRepository aiChatRoomRepository;
    private final AiChatReportRepository aiChatReportRepository;

    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;

    private final OpenAiCommunicationProvider openAiCommunicationProvider;
    private final OpenAiRepository openAiRepository;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * {@inheritDoc}
     */
    @Override
    public AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        AiChatRoom aiChatRoom = AiChatRoom.builder()
                .member(member)
                .category(category)
                .build();

        AiChatRoom room = aiChatRoomRepository.save(aiChatRoom);

        return AiChatRoomCreateResponse.builder()
                .id(room.getId())
                .memberId(memberId)
                .category(category)
                .build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sendAiChatMessageByUser(Long memberId, Long roomId, AiChatMessage userMessage) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(()
                -> new AiChatException(AiChatErrorCode.NOT_FOUND_AI_CHAT_ROOM));

        AiChatHistory aiChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.USER)
                .content(userMessage.japanese())
                .build();

        aiChatHistoryRepository.save(aiChatHistory);

        // 사용자 메시지를 Redis에 저장
        openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage("user", userMessage.japanese())));

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userMessage);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Conversation> sendAiChatMessageByGpt(Long roomId, AiChatMessage userMessage) {
        return openAiRepository.findOpenAiSetup(roomId)
                .switchIfEmpty(Mono.error(new AiChatException(AiChatErrorCode.NOT_FOUNT_AI_CHAT_ROOM_SETUP)))
                .flatMap(setupRequest ->
                        // Redis에서 최근 대화 내역 가져오기
                        openAiRepository.findAiChatHistory(roomId)
                                .flatMap(historyMessages -> {
                                    List<GptDialogueMessage> messages = new ArrayList<>(setupRequest.messages());
                                    if (!historyMessages.isEmpty()) {
                                        // 최근 대화 내역 추가
                                        messages.addAll(historyMessages);
                                    }

                                    GptChatRequest gptChatRequest = new GptChatRequest("gpt-3.5-turbo-1106", messages, 500);

                                    return openAiCommunicationProvider.sendPromptToGpt(gptChatRequest)
                                            .flatMap(response -> {

                                                Conversation conversation = parseGetResponse(response);
                                                // GPT 응답을 Redis에 저장
                                                openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage("assistant", response)));

                                                AiChatMessage gptMessage = AiChatMessage.builder()
                                                        .sender(AiChatSender.GPT)
                                                        .japanese(conversation.gptJapaneseResponse())
                                                        .korean(conversation.gptKoreanResponse())
                                                        .build();

                                                // GPT 일본어 응답 rabbitmq 통해서 전달
                                                rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);

                                               return Mono.just(conversation);
                                            });
                                })
                )
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Conversation> setupAiChatBot(Long roomId, AiChatCategory category) {
        // 채팅방 정보와 GPT 설정을 병렬로 실행
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
                        .orElseThrow(() -> new AiChatException(AiChatErrorCode.NOT_FOUND_AI_CHAT_ROOM)))
                .subscribeOn(Schedulers.boundedElastic())
                .zipWith(openAiCommunicationProvider.setupPromptToGpt(category),
                        (aiChatRoom, setupResponse) -> {
                            // 설정된 대화 정보를 기반으로 Conversation 객체 생성
                            Conversation conversation = parseGetResponse(setupResponse);

                            // 생성된 대화 정보를 DB에 저장
                            AiChatHistory aiChatHistory = AiChatHistory.builder()
                                    .aiChatRoom(aiChatRoom)
                                    .sender(AiChatSender.GPT)
                                    .content(conversation.gptJapaneseResponse())
                                    .build();
                            aiChatHistoryRepository.save(aiChatHistory);

                            GptSetupRequest setupRequest = GptSetupRequest.from(category);

                            // Redis에 GPT 세팅한 프롬포트 저장
                            openAiRepository.saveOpenAiSetup(roomId, setupRequest);

                            // Redis에 GPT 응답 메시지 저장
                            openAiRepository.saveAiChatHistory(roomId, List.of(
                                    new GptDialogueMessage("assistant", setupResponse)
                            ));

                            AiChatMessage gptMessage = AiChatMessage.builder()
                                    .sender(AiChatSender.GPT)
                                    .japanese(conversation.gptJapaneseResponse())
                                    .korean(conversation.gptKoreanResponse())
                                    .build();

                            // 메시지 브로커에 전달
                            rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);

                            return conversation;
                        })
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Long> createReport(Long roomId) {
        return Mono.fromCallable(() -> aiChatHistoryRepository.findByAiChatRoomId(roomId))
                .subscribeOn(Schedulers.boundedElastic())
                .map(AiChatReportCreateApiRequest::convertRequest)
                .flatMap(request -> webClient.post()
                        .uri("/chat/completions")
                        .bodyValue(request)
                        .retrieve()
                        .bodyToMono(GptChatCompletionResponse.class))
                .flatMap(response -> {
                    String content = response.choices().get(0).message().content();
                    log.info("GPT 레포트 결과!!!!: {}", content);
                    return Mono.fromCallable(() -> objectMapper.readValue(content, AiChatReportCreateRequest.class))
                            .flatMap(res -> openAiCommunicationProvider.saveReport(roomId, res));
                });
    }


    @Override
    public List<AiChatAndFeedbackInfo> getAiChatFeedbackInfo() {
        QAiChatHistory qAiChatHistory = QAiChatHistory.aiChatHistory;
        QAiChatFeedback qAiChatFeedback = QAiChatFeedback.aiChatFeedback;

        // 급한대로 gpt의 피드백도 생기는 오류를
        // 아래 분기를 통해 해결
        return jpaQueryFactory
                .select(
                        qAiChatHistory.id, // 이 부분은 chatId를 나타내며, AiChatHistory의 ID를 참조합니다.
                        qAiChatHistory.sender, // sender에 해당
                        qAiChatHistory.content, // message에 해당
//                        qAiChatFeedback.content // feedback에 해당
                        new CaseBuilder()
                                .when(qAiChatHistory.sender.eq(AiChatSender.GPT)) // sender가 GPT enum 값과 동일한 경우
                                .then(Expressions.stringTemplate("CAST(NULL AS java.lang.String)")) // feedback을 null로 설정
                                .otherwise(qAiChatFeedback.content) // 그렇지 않으면 실제 feedback 내용 사용
                )
                .from(qAiChatHistory)
                .leftJoin(qAiChatFeedback).on(qAiChatHistory.id.eq(qAiChatFeedback.aiChatHistory.id))
                .fetch()
                .stream()
                .map(tuple -> new AiChatAndFeedbackInfo(
                        tuple.get(qAiChatHistory.id),
                        tuple.get(qAiChatHistory.sender),
                        tuple.get(qAiChatHistory.content),
                        tuple.get(3, String.class) // feedback에 해당하는 값 처리
                ))
                .toList();
    }

    @Override
    public FullReportInfo getReportDetail(Long reportId) {
        AiChatReport aiChatReport = aiChatReportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Can't find the report with id: " + reportId));

        List<AiChatAndFeedbackInfo> aiChatAndFeedbackInfos = this.getAiChatFeedbackInfo();

        return new FullReportInfo(AiChatReport.dto(aiChatReport), aiChatAndFeedbackInfos) ;
    }

    @Override
    public List<AiChatReportInfo> getUserReports(Long memberId) {
        List<AiChatRoom> aiChatRooms = aiChatRoomRepository.findByMemberId(memberId);

        // 각 AiChatRoom에 대한 AiChatReport를 조회하고, AiChatReportInfo로 변환하여 수집
        return aiChatRooms.stream()
                .map(aiChatRoom -> {
                    // AiChatRoom ID를 사용하여 각 AiChatRoom에 대응하는 AiChatReport를 조회
                    AiChatReport aiChatReport = aiChatReportRepository.findByAiChatRoomId(aiChatRoom.getId());
                    // AiChatReport가 존재하고, 해당 AiChatRoom의 category 정보를 사용하여 AiChatReportInfo 생성
                    return (aiChatReport != null) ? new AiChatReportInfo(aiChatReport.getId(), aiChatRoom.getCategory()) : null;
                })
                .filter(Objects::nonNull) // null인 결과 제거
                .collect(Collectors.toList());
    }


    private Conversation parseGetResponse(String responseString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseString);
            // "conversation" 객체를 직접 찾습니다.
            // 만약 응답에 "conversation" 외의 다른 데이터가 포함되어 있고, 그 부분을 무시하고자 할 때 사용합니다.
            JsonNode conversationNode = root.path("conversation");
            return mapper.treeToValue(conversationNode, Conversation.class);
        } catch (Exception e) {
            // TODO: 파싱 예외 발생했다는건 대화가 주제에 안맞거나 종료되었다는 의미 (JSON 형태로 안오거나 conversation 객체에 감싸서 안왔다는 의미)
            log.info("exception 터지는지 확인하기: {}", e.getMessage());
            throw new AiChatException(AiChatErrorCode.DUPLICATE_CONVERSATION_TOPIC);
        }
    }
}
