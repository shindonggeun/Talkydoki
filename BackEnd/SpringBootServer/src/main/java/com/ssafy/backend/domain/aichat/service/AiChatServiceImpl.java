package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import com.ssafy.backend.domain.aichat.exception.AiChatErrorCode;
import com.ssafy.backend.domain.aichat.exception.AiChatException;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
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
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.ArrayList;
import java.util.List;


/**
 * AI 채팅 관련 기능을 구현하는 서비스 클래스.
 * 이 클래스는 AI 채팅방 생성, 사용자 메시지 처리 및 GPT 대화 설정 등을 담당합니다.
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
    private final OpenAiRepository openAiRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category) {
        // 해당 회원 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 채팅방 생성 및 저장
        AiChatRoom aiChatRoom = AiChatRoom.builder()
                .member(member)
                .category(category)
                .build();
        AiChatRoom room = aiChatRoomRepository.save(aiChatRoom);

        // 생성한 채팅방 정보 반환
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
        // 사용자 정보와 채팅방 정보를 검증합니다.
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(()
        -> new AiChatException(AiChatErrorCode.NOT_FOUND_AI_CHAT_ROOM));

        // 사용자 메시지를 저장합니다.
        saveUserMessage(roomId, aiChatRoom, userMessage);

        // GPT와의 대화를 진행합니다.
        handleConversationWithGpt(roomId, userMessage);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Mono<Conversation> setupAiChatBot(Long roomId, AiChatCategory category) {
        // 채팅방 정보 조회를 비동기로 수행
        Mono<AiChatRoom> aiChatRoomMono = Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
                        .orElseThrow(() -> new AiChatException(AiChatErrorCode.NOT_FOUND_AI_CHAT_ROOM)))
                .subscribeOn(Schedulers.boundedElastic());

        // GPT 설정 요청을 비동기로 수행
        Mono<String> setupResponseMono = openAiCommunicationProvider.setupPromptToGpt(category)
                .subscribeOn(Schedulers.boundedElastic());

        // 채팅방 정보와 GPT 설정 결과를 합쳐서 처리
        return aiChatRoomMono.flatMap(aiChatRoom -> setupResponseMono
                .flatMap(setupResponse -> parseGetResponse(roomId, setupResponse) // GPT 응답 파싱
                        .flatMap(conversation -> {
                            // 설정된 대화 정보를 DB에 저장
                            AiChatHistory aiChatHistory = AiChatHistory.builder()
                                    .aiChatRoom(aiChatRoom)
                                    .sender(AiChatSender.GPT)
                                    .content(conversation.gptJapaneseResponse())
                                    .build();
                            return Mono.fromCallable(() -> aiChatHistoryRepository.save(aiChatHistory))
                                    .subscribeOn(Schedulers.boundedElastic())
                                    .then(Mono.just(conversation));
                        })
                        .doOnSuccess(conversation -> {
                            // Redis에 설정 정보 및 응답 메시지 저장
                            GptSetupRequest setupRequest = GptSetupRequest.from(category);
                            openAiRepository.saveOpenAiSetup(roomId, setupRequest);
                            openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage("assistant", setupResponse)));

                            // RabbitMQ를 통해 메시지 전송
                            AiChatMessage gptMessage = buildAiChatMessage(conversation.gptJapaneseResponse(), conversation.gptKoreanResponse(), AiChatSender.GPT);
                            rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);
                        }))
                .subscribeOn(Schedulers.boundedElastic()));
    }

    /**
     * 사용자가 보낸 메시지를 저장하고 RabbitMQ를 통해 해당 메시지를 전송합니다.
     * 이 과정은 사용자의 상호작용을 AI 채팅 기록으로 유지하며,
     * 실시간으로 메시지를 다른 서비스나 컴포넌트에 알립니다.
     *
     * @param roomId     대화가 이루어지는 채팅방의 식별자
     * @param aiChatRoom 사용자 메시지와 연관된 AI 채팅방 인스턴스
     * @param userMessage 사용자가 보낸 메시지 정보를 담은 객체
     */
    private void saveUserMessage(Long roomId, AiChatRoom aiChatRoom, AiChatMessage userMessage) {
        // 사용자의 메시지를 채팅 기록으로 저장합니다.
        AiChatHistory aiChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.USER)
                .content(userMessage.japanese())
                .build();

        // 사용자의 메시지를 DB와 Redis에 저장합니다.
        aiChatHistoryRepository.save(aiChatHistory);
        openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage( "user", userMessage.japanese())));

        // RabbitMQ를 통해 실시간으로 사용자 메시지를 전송합니다.
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userMessage);
    }

    /**
     * GPT와의 대화 처리를 담당합니다. 사용자 메시지를 바탕으로 GPT와의 대화를 진행하고,
     * 대화 결과를 RabbitMQ를 통해 전송합니다.
     *
     * @param roomId      대화가 이루어지는 채팅방의 식별자
     * @param userMessage 사용자가 보낸 메시지 정보를 담은 객체
     */
    private void handleConversationWithGpt(Long roomId, AiChatMessage userMessage) {
        // GPT와의 대화를 비동기적으로 처리하고 결과를 RabbitMQ로 전송합니다.
        sendAiChatMessageByGpt(roomId, userMessage)
                .subscribe(conversation -> {
                    // GPT와 사용자 모범 답안의 메시지를 RabbitMQ를 통해 전달합니다.
                    sendMessagesToRabbitMQ(roomId, conversation);
                });
    }

    /**
     * 사용자 메시지를 바탕으로 GPT와의 대화를 진행하고, 대화 결과를 Mono<Conversation> 형태로 반환합니다.
     *
     * @param roomId      대화가 진행되는 채팅방의 식별자
     * @param userMessage 사용자가 보낸 메시지
     * @return 대화 결과를 포함하는 Mono<Conversation> 객체
     */
    private Mono<Conversation> sendAiChatMessageByGpt(Long roomId, AiChatMessage userMessage) {
        // GPT 채팅 설정을 조회하고, 설정이 없는 경우 예외를 발생시킵니다.
        return openAiRepository.findOpenAiSetup(roomId)
                .switchIfEmpty(Mono.error(new AiChatException(AiChatErrorCode.NOT_FOUNT_AI_CHAT_ROOM_SETUP)))
                .flatMap(setupRequest -> processGptConversation(roomId, setupRequest, userMessage));
    }

    /**
     * GPT와의 대화를 처리합니다. 이 과정에서는 이전 대화 내역과 사용자 메시지를 포함하여
     * GPT에 대화를 요청하고, 응답을 처리합니다.
     *
     * @param roomId       대화가 진행되는 채팅방의 식별자
     * @param setupRequest GPT 대화 설정
     * @param userMessage  사용자가 보낸 메시지
     * @return 대화 결과를 포함하는 Mono<Conversation> 객체
     */
    private Mono<Conversation> processGptConversation(Long roomId, GptSetupRequest setupRequest, AiChatMessage userMessage) {
        // 이전 대화 내역을 포함한 새 대화 요청을 구성합니다.
        List<GptDialogueMessage> messages = new ArrayList<>(setupRequest.messages());
        return openAiRepository.findAiChatHistory(roomId)
                .flatMap(historyMessages -> {
                    messages.addAll(historyMessages);
//                    log.info(messages.toString());
                    GptChatRequest gptChatRequest = new GptChatRequest("gpt-3.5-turbo-1106", messages, 500);
                    return openAiCommunicationProvider.sendPromptToGpt(gptChatRequest);
                })
                // 아래의 map을 람다 표현식으로 변경합니다.
                .flatMap(responseString -> {
                    openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage("assistant", responseString)));
                    return parseGetResponse(roomId, responseString);
                }); // 람다 표현식 사용
    }

    private void sendMessagesToRabbitMQ(Long roomId, Conversation conversation) {
        AiChatMessage gptMessage = buildAiChatMessage(conversation.gptJapaneseResponse(), conversation.gptKoreanResponse(), AiChatSender.GPT);
        AiChatMessage userTipMessage = buildAiChatMessage(conversation.userJapaneseResponse(), conversation.userKoreanResponse(), AiChatSender.USER_TIP);

        // GPT 응답과 사용자 모범 답안을 RabbitMQ를 통해 전달
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userTipMessage);
    }

    private AiChatMessage buildAiChatMessage(String japanese, String korean, AiChatSender sender) {
        return AiChatMessage.builder()
                .sender(sender)
                .japanese(japanese)
                .korean(korean)
                .build();
    }

    private Mono<Conversation> parseGetResponse(Long roomId, String responseString) {
        return Mono.fromCallable(() -> {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(responseString);
            JsonNode conversationNode = root.path("conversation");
            return mapper.treeToValue(conversationNode, Conversation.class);
        }).onErrorResume(e -> {
            log.info("exception 터지는지 확인하기: {}", e.getMessage());
            sendExceptionToRabbitMQ(roomId);
            return Mono.empty(); // 예외가 발생했을 때 빈 Mono를 반환
        });
    }

    private void sendExceptionToRabbitMQ(Long roomId) {
        AiChatMessage errorMessage = buildAiChatMessage(AiChatErrorCode.DUPLICATE_CONVERSATION_TOPIC.getErrorMessage(),
                AiChatErrorCode.DUPLICATE_CONVERSATION_TOPIC.getErrorMessage(), AiChatSender.GPT);

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, errorMessage);
    }
}
