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
    public Mono<Conversation> setupAiChatBot(Long roomId, AiChatCategory category) {
        return getAiChatRoom(roomId) // roomId에 해당하는 AiChatRoom을 비동기적으로 조회합니다.
                .flatMap(aiChatRoom -> setupGptAndSaveHistory(roomId, aiChatRoom, category)) // 조회된 AiChatRoom과 함께 GPT 설정 및 이력 저장 로직을 수행합니다.
                .subscribeOn(Schedulers.boundedElastic()); // 이 작업을 별도의 스레드에서 실행하도록 Schedulers를 사용하여 구독합니다.
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
        handleConversationWithGpt(roomId);
    }

    /**
     * 채팅방 ID를 기반으로 해당 채팅방을 조회합니다.
     * 비동기적으로 처리되며, 채팅방이 존재하지 않을 경우 AiChatException을 발생시킵니다.
     * @param roomId 채팅방의 ID
     * @return 조회된 AiChatRoom에 대한 Mono 객체
     */
    private Mono<AiChatRoom> getAiChatRoom(Long roomId) {
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
                        .orElseThrow(() -> new AiChatException(AiChatErrorCode.NOT_FOUND_AI_CHAT_ROOM)))
                .subscribeOn(Schedulers.boundedElastic());
    }

    /**
     * GPT 설정을 진행하고, 해당 설정에 기반한 대화를 분석하여 저장합니다.
     *
     * @param roomId 채팅방의 ID
     * @param aiChatRoom 채팅방 객체
     * @param category 채팅방 카테고리
     * @return 설정된 대화에 대한 Mono<Conversation> 객체
     */
    private Mono<Conversation> setupGptAndSaveHistory(Long roomId, AiChatRoom aiChatRoom, AiChatCategory category) {
        return openAiCommunicationProvider.setupPromptToGpt(category) // 주어진 카테고리에 대해 GPT 프롬프트 설정을 시작합니다.
                .flatMap(setupResponse -> parseAndSaveResponse(roomId, aiChatRoom, setupResponse, category)); // 설정 응답을 분석하고 저장하는 메소드를 호출합니다.
    }

    /**
     * GPT 설정 응답을 파싱하고, 결과를 저장한 후, RabbitMQ를 통해 메시지를 전송합니다.
     *
     * @param roomId 채팅방 ID
     * @param aiChatRoom 채팅방 객체
     * @param setupResponse GPT 설정에 대한 응답 문자열
     * @param category 채팅방 카테고리
     * @return 설정된 대화에 대한 Mono<Conversation> 객체
     */
    private Mono<Conversation> parseAndSaveResponse(Long roomId, AiChatRoom aiChatRoom, String setupResponse, AiChatCategory category) {
        return parseGetResponse(roomId, setupResponse) // 설정 응답 문자열을 분석하여 Conversation 객체로 변환합니다.
                .doOnSuccess(conversation -> { // 성공적으로 Conversation 객체를 얻었을 때 수행할 작업을 정의합니다.
                    saveGptMessage(aiChatRoom, conversation, category, setupResponse); // GPT 메시지를 데이터베이스에 저장합니다.
                    sendMessagesToRabbitMQ(roomId, conversation); // 메시지를 RabbitMQ를 통해 전송합니다.
                });
    }

    /**
     * GPT로부터 받은 대화 메시지를 데이터베이스에 저장하고, 대화 설정 및 응답 메시지를 Redis에 저장합니다.
     *
     * @param aiChatRoom 대화가 이루어지는 AI 채팅방 객체
     * @param conversation GPT와의 대화 내용
     * @param category 대화 카테고리
     * @param setupResponse GPT 설정 응답 문자열
     */
    private void saveGptMessage(AiChatRoom aiChatRoom, Conversation conversation, AiChatCategory category, String setupResponse) {
        // 대화 메시지 DB에 저장
        AiChatHistory gptChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.GPT)
                .content(conversation.gptJapaneseResponse())
                .build();

        // GPT의 응답 메시지를 DB에 저장합니다.
        aiChatHistoryRepository.save(gptChatHistory);

        // GPT의 프롬포트 설정 메시지와 응답 메시지를 Redis에 저장합니다. (캐싱 용도)
        GptSetupRequest gptSetupRequest = GptSetupRequest.from(category);
        openAiRepository.saveOpenAiSetup(aiChatRoom.getId(), gptSetupRequest);
        openAiRepository.saveAiChatHistory(aiChatRoom.getId(), List.of(new GptDialogueMessage("assistant", setupResponse)));
    }

    /**
     * 사용자로부터 받은 메시지를 저장하고, RabbitMQ를 통해 해당 메시지를 다른 서비스나 컴포넌트에 실시간으로 알립니다.
     *
     * @param roomId 대화가 이루어지는 채팅방의 ID
     * @param aiChatRoom 사용자 메시지와 연관된 AI 채팅방 객체
     * @param userMessage 사용자가 보낸 메시지 정보
     */
    private void saveUserMessage(Long roomId, AiChatRoom aiChatRoom, AiChatMessage userMessage) {
        // 사용자의 메시지를 채팅 기록으로 저장합니다.
        AiChatHistory userChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.USER)
                .content(userMessage.japanese())
                .build();

        // 사용자의 메시지를 DB와 Redis에 저장합니다.
        aiChatHistoryRepository.save(userChatHistory);
        openAiRepository.saveAiChatHistory(roomId, List.of(new GptDialogueMessage( "user", userMessage.japanese())));

        // RabbitMQ를 통해 실시간으로 사용자 메시지를 전송합니다.
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userMessage);
    }

    /**
     * GPT와 대화 처리를 담당하여, 사용자 메시지를 기반으로 GPT와 대화를 진행하고 그 결과를 RabbitMQ를 통해 전송합니다.
     * 이 메서드는 비동기적으로 대화를 진행하며, 대화 결과를 다른 사용자나 서비스와 공유하기 위해 메시지 브로커를 사용합니다.
     *
     * @param roomId 대화가 이루어지는 채팅방의 ID
     */
    private void handleConversationWithGpt(Long roomId) {
        // GPT와의 대화를 비동기적으로 처리하고 결과를 RabbitMQ로 전송합니다.
        sendAiChatMessageByGpt(roomId)
                .subscribe(conversation -> {
                    // GPT와 사용자 모범 답안의 메시지를 RabbitMQ를 통해 전달합니다.
                    sendMessagesToRabbitMQ(roomId, conversation);
                });
    }

    /**
     * 사용자 메시지를 바탕으로 GPT와의 대화를 진행하고, 그 결과를 Mono<Conversation> 형태로 반환합니다.
     * 이 과정은 GPT 설정을 확인하고, 설정된 대화 내역을 기반으로 GPT와의 새로운 대화를 생성합니다.
     *
     * @param roomId 대화가 진행되는 채팅방의 ID
     * @return 대화 결과를 포함하는 Mono<Conversation> 객체
     */
    private Mono<Conversation> sendAiChatMessageByGpt(Long roomId) {
        // GPT 채팅 설정을 조회하고, 설정이 없는 경우 예외를 발생시킵니다.
        return openAiRepository.findOpenAiSetup(roomId)
                .switchIfEmpty(Mono.error(new AiChatException(AiChatErrorCode.NOT_FOUNT_AI_CHAT_ROOM_SETUP)))
                .flatMap(setupRequest -> processGptConversation(roomId, setupRequest));
    }

    /**
     * GPT와의 대화를 처리합니다.
     * 이 과정에서는 이전 대화 내역과 사용자 메시지를 포함하여 GPT에 대화를 요청하고, 응답을 처리합니다.
     *
     * @param roomId       대화가 진행되는 채팅방의 ID
     * @param setupRequest GPT 대화 설정
     * @return 대화 결과를 포함하는 Mono<Conversation> 객체
     */
    private Mono<Conversation> processGptConversation(Long roomId, GptSetupRequest setupRequest) {
        List<GptDialogueMessage> messages = new ArrayList<>(setupRequest.messages()); // 설정 요청으로부터 초기 대화 메시지 목록을 가져옵니다.
        return openAiRepository.findAiChatHistory(roomId) // roomId에 해당하는 이전 대화 내역을 비동기적으로 조회합니다.
                .flatMap(historyMessages -> {
                    // 이전 대화 내역을 메시지 목록에 추가합니다.
                    messages.addAll(historyMessages);
                    // GPT와의 새 대화 요청을 생성합니다.
                    GptChatRequest gptChatRequest = new GptChatRequest("gpt-3.5-turbo-1106", messages, 500);
                    // GPT에 대화 요청을 보내고 응답을 받습니다.
                    return openAiCommunicationProvider.sendPromptToGpt(gptChatRequest);
                })
                .flatMap(responseString ->
                        parseGetResponse(roomId, responseString) // GPT로부터 받은 응답을 파싱합니다.
                                .flatMap(conversation ->
                                        getAiChatRoom(roomId) // roomId에 해당하는 AiChatRoom을 다시 조회합니다.
                                                .doOnSuccess(aiChatRoom -> {
                                                    // GPT 메시지를 데이터베이스와 Redis에 저장합니다.
                                                    saveGptMessage(aiChatRoom, conversation, aiChatRoom.getCategory(), responseString);
                                                })
                                                .thenReturn(conversation) // Conversation 객체를 반환합니다.
                                )
                );
    }

    /**
     * RabbitMQ를 통해 GPT 응답과 사용자의 모범 답안 메시지를 전송합니다.
     * 이 메서드는 대화의 흐름을 다른 사용자나 서비스와 실시간으로 공유하는 데 사용됩니다.
     *
     * @param roomId 대화가 이루어지는 채팅방의 ID
     * @param conversation GPT와의 대화 결과
     */
    private void sendMessagesToRabbitMQ(Long roomId, Conversation conversation) {
        AiChatMessage gptMessage = buildAiChatMessage(conversation.gptJapaneseResponse(), conversation.gptKoreanResponse(), AiChatSender.GPT);
        AiChatMessage userTipMessage = buildAiChatMessage(conversation.userTipJapaneseResponse(), conversation.userTipKoreanResponse(), AiChatSender.USER_TIP);

        // GPT 응답과 사용자 모범 답안을 RabbitMQ를 통해 전달
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);
        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, userTipMessage);
    }

    /**
     * 대화 메시지를 구성하는 메서드입니다.
     * 이 메서드는 GPT의 응답 또는 사용자의 모범 답안 등 대화에 사용될 메시지를 구성하여 반환합니다.
     *
     * @param japanese 일본어 대화 내용입니다.
     * @param korean 한국어 대화 내용입니다.
     * @param sender 메시지의 발신자 (GPT 또는 사용자 모범 답안)
     * @return 구성된 AiChatMessage 객체
     */
    private AiChatMessage buildAiChatMessage(String japanese, String korean, AiChatSender sender) {
        return AiChatMessage.builder()
                .sender(sender)
                .japanese(japanese)
                .korean(korean)
                .build();
    }

    /**
     * GPT로부터 받은 응답 문자열을 파싱하여 대화 객체로 변환합니다.
     * 이 메서드는 GPT 응답의 JSON 구조를 해석하여 필요한 정보를 추출하는 데 사용됩니다.
     *
     * @param roomId 대화가 이루어지는 채팅방의 ID입니다.
     * @param responseString GPT로부터 받은 응답 문자열입니다.
     * @return 파싱된 대화 내용을 포함하는 Mono<Conversation> 객체입니다.
     */
    private Mono<Conversation> parseGetResponse(Long roomId, String responseString) {
        return Mono.fromCallable(() -> {
            ObjectMapper mapper = new ObjectMapper(); // JSON 데이터를 처리하기 위한 ObjectMapper 인스턴스를 생성합니다.
            JsonNode root = mapper.readTree(responseString); // 문자열로부터 JSON 노드 트리를 생성합니다.
            JsonNode conversationNode = root.path("conversation"); // JSON 트리에서 "conversation" 필드를 찾습니다.
            return mapper.treeToValue(conversationNode, Conversation.class); // JSON 노드를 Conversation 클래스의 인스턴스로 변환합니다.
        }).onErrorResume(e -> {
            log.info("exception 터지는지 확인하기: {}", e.getMessage()); // 예외 발생 시 로그를 남깁니다.
            sendExceptionToRabbitMQ(roomId); // 예외 발생 시 RabbitMQ를 통해 에러 메시지를 전송합니다.
            return Mono.empty(); // 예외가 발생했을 때 빈 Mono를 반환하여 에러 회복을 시도합니다.
        });
    }

    /**
     * 예외 발생 시 RabbitMQ를 통해 에러 메시지를 전송합니다.
     * 이 메서드는 대화 설정 과정에서 발생하는 예외를 처리하고, 관련 정보를 다른 사용자나 서비스와 공유하는 데 사용됩니다.
     *
     * @param roomId 예외가 발생한 채팅방의 ID입니다.
     */
    private void sendExceptionToRabbitMQ(Long roomId) {
        AiChatMessage errorMessage = buildAiChatMessage(AiChatErrorCode.DUPLICATE_CONVERSATION_TOPIC.getErrorMessage(),
                AiChatErrorCode.DUPLICATE_CONVERSATION_TOPIC.getErrorMessage(), AiChatSender.GPT);

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, errorMessage);
    }
}
