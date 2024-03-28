package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.global.component.openai.dto.Conversation;
import reactor.core.publisher.Mono;


public interface AiChatService {

    /**
     * 새로운 AI 채팅방을 생성합니다.
     *
     * @param memberId 사용자 ID
     * @param category 채팅방 카테고리
     * @return 생성된 AI 채팅방의 정보를 담은 응답 객체
     */
    AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category);

    /**
     * AI 채팅 봇을 설정합니다.
     *
     * @param roomId   채팅방 ID
     * @param category 채팅방 카테고리
     * @return 설정된 대화에 대한 Mono<Conversation>
     */
    Mono<Conversation> setupAiChatBot(Long roomId, AiChatCategory category);

    /**
     * 사용자로부터 AI 채팅 메시지를 받아 처리합니다.
     *
     * @param memberId 사용자 ID
     * @param roomId   채팅방 ID
     * @param userMessage 사용자 메시지
     */
    void sendAiChatMessageByUser(Long memberId, Long roomId, AiChatMessage userMessage);

}
