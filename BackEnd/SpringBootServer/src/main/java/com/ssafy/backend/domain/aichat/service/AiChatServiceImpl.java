package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.openai.OpenAiCommunicationProvider;
import com.ssafy.backend.global.component.openai.dto.*;
import com.ssafy.backend.global.component.openai.repository.OpenAiSetupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;


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

    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;

    private final OpenAiCommunicationProvider openAiCommunicationProvider;
    private final OpenAiSetupRepository openAiSetupRepository;


    /**
     * {@inheritDoc}
     */
    @Override
    public AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

//        GptThreadCreateResponse threadResponse = openAiCommunicationProvider.createThread();

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
        log.info("메시지 보내는사람: {}", member.getName());

        // TODO: AI 회화 채팅 커스텀 Exception 처리
        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(()
                -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다."));

        AiChatHistory aiChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.USER)
                .content(userMessage.content())
                .build();

        aiChatHistoryRepository.save(aiChatHistory);

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userMessage);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Void> sendAiChatMessageByGpt(Long roomId, AiChatMessage userMessage) {
        // 채팅방 조회 및 AI 응답 처리
//        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
//                        .orElseThrow(() -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다.")))
//                .subscribeOn(Schedulers.boundedElastic()) // 블로킹 호출을 별도의 스레드에서 처리
//                .flatMap(aiChatRoom -> {
//                    // TODO: 대화 내역 가져오는거 Redis 이용해서 캐싱작업하기 (DB에 접근하지 말고)
//                    List<GptDialogueMessage> conversationHistory;// 대화 내역을 가져오는 로직 구현
//
//
//                    GptChatRequest gptChatRequest = GptChatRequest.from(userMessage, conversationHistory);
//
//                    return openAiCommunicationProvider.sendPromptToGpt(gptChatRequest)
//                            .onErrorMap(exception -> new RuntimeException(exception.getMessage())) // 오류 처리
//                            .doOnSuccess(response -> {
//                                log.info("GPT 대화 온거 확인: {}", response);
//                                // 여기에서 DB 업데이트 등의 추가 로직 구현
//                            });
//                }).then(); // 작업 완료 시 Mono<Void> 반환

        return openAiSetupRepository.find(roomId)
                .switchIfEmpty(Mono.error(new RuntimeException("GPT 채팅방 설정을 찾을 수 없습니다."))) // 여기로 이동
                .flatMap(setupRequest -> {
                    GptChatRequest gptChatRequest = GptChatRequest.from(userMessage, setupRequest.messages());
                    return openAiCommunicationProvider.sendPromptToGpt(gptChatRequest)
                            .doOnSuccess(response -> {
                                log.info("GPT 대화 응답: {}", response);
                                Conversation conversation = parseGetResponse(response);
                                
                                // 대화 운거 return 해주기
                            })
                            .then(); // setupRequest가 있을 경우만 실행
                })
                .subscribeOn(Schedulers.boundedElastic());
    }

    @Override
    public Mono<Conversation> setupAiChatBot(Long roomId, AiChatCategory category) {
        // 채팅방 정보와 GPT 설정을 병렬로 실행
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
                        .orElseThrow(() -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다.")))
                .subscribeOn(Schedulers.boundedElastic())
                .zipWith(openAiCommunicationProvider.setupPromptToGpt(category)
                                .onErrorMap(exception -> new RuntimeException("GPT 설정 실패: " + exception.getMessage())),
                        (aiChatRoom, setupResponse) -> {
                            // 설정된 대화 정보 로깅
                            log.info("GPT 대화 세팅 완료: {}", setupResponse);
                            // 설정된 대화 정보를 기반으로 Conversation 객체 생성
                            Conversation conversation = parseGetResponse(setupResponse);

                            // 생성된 대화 정보를 DB에 저장
                            AiChatHistory aiChatHistory = AiChatHistory.builder()
                                    .aiChatRoom(aiChatRoom)
                                    .sender(AiChatSender.GPT)
                                    .content(conversation.gptJapaneseResponse())
                                    .build();
                            aiChatHistoryRepository.save(aiChatHistory);

                            // Redis에 GptSetupRequest 저장
                            GptSetupRequest setupRequest = GptSetupRequest.from(category);
                            openAiSetupRepository.save(roomId, setupRequest);

                            AiChatMessage gptMessage = AiChatMessage.builder()
                                    .sender(AiChatSender.GPT)
                                    .content(conversation.gptJapaneseResponse())
                                    .build();

                            // 메시지 브로커에 전달
                            rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);

                            return conversation;
                        })
                .subscribeOn(Schedulers.boundedElastic());
    }

    private Conversation parseGetResponse(String jsonString) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(jsonString);
            // "conversation" 객체를 직접 찾습니다.
            // 만약 응답에 "conversation" 외의 다른 데이터가 포함되어 있고, 그 부분을 무시하고자 할 때 사용합니다.
            JsonNode conversationNode = root.path("conversation");
            if (conversationNode.isMissingNode()) {
                throw new RuntimeException("Conversation 객체를 찾을 수 없습니다. (즉, GPT 응답 고장난 경우)");
            }

            Conversation conversation = mapper.treeToValue(conversationNode, Conversation.class);
            log.info("gpt 답변 일본어 파싱한 것: {}", conversation.gptJapaneseResponse());
            log.info("gpt 답변 한국어 파싱한 것: {}", conversation.gptKoreanResponse());
            log.info("user 모범 답변 일본어 파싱한 것: {}", conversation.userJapaneseResponse());
            log.info("user 모범 답변 한국어 파싱한 것: {}", conversation.userKoreanResponse());
            return conversation;
        } catch (Exception e) {
            throw new RuntimeException("파싱 예외 발생", e);
        }
    }
}
