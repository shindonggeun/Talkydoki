package com.ssafy.backend.domain.aichat.service;

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
import com.ssafy.backend.global.component.openai.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

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

    private final OpenAiService openAiService;


    /**
     * {@inheritDoc}
     */
    @Override
    public AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

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
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId)
                        .orElseThrow(() -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다.")))
                .subscribeOn(Schedulers.boundedElastic()) // 블로킹 호출을 별도의 스레드에서 처리
                .flatMap(aiChatRoom -> openAiService.sendPromptToGpt(userMessage) // AI 채팅봇으로부터 응답 받기
                        .onErrorMap(exception -> new RuntimeException("GPT 관련 오류입니다.")) // 오류 처리
                        .flatMap(response -> { // 응답을 기반으로 채팅 히스토리 생성 및 저장
                            AiChatHistory aiChatHistory = AiChatHistory.builder()
                                    .aiChatRoom(aiChatRoom)
                                    .sender(AiChatSender.GPT)
                                    .content(response)
                                    .build();
                            return Mono.fromCallable(() -> aiChatHistoryRepository.save(aiChatHistory))
                                    .subscribeOn(Schedulers.boundedElastic())
                                    .thenReturn(response);
                        })
                        .doOnNext(response -> { // AI 응답 메시지를 RabbitMQ를 통해 채팅방으로 전송
                            AiChatMessage gptMessage = new AiChatMessage(AiChatSender.GPT, response);
                            rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, gptMessage);
                        })
                ).then(); // 작업 완료 시 Mono<Void> 반환
    }
}
