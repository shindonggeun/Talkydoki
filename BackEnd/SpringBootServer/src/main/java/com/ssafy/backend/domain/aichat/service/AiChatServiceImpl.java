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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiChatServiceImpl implements AiChatService {

    private final AiChatHistoryRepository aiChatHistoryRepository;
    private final MemberRepository memberRepository;
    private final AiChatRoomRepository aiChatRoomRepository;

    private final RabbitTemplate rabbitTemplate;
    private final TopicExchange topicExchange;


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

    @Override
    public void sendMessageAiChat(Long memberId, Long roomId, AiChatMessage aiChatMessage) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));
        log.info("메시지 보내는사람: {}", member.getName());

        // TODO: AI 회화 채팅 커스텀 Exception 처리
        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(()
        -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다."));

        AiChatHistory aiChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(AiChatSender.USER)
                .content(aiChatMessage.content())
                .build();

        aiChatHistoryRepository.save(aiChatHistory);

        rabbitTemplate.convertAndSend(topicExchange.getName(), "room." + roomId, aiChatMessage);
    }
}
