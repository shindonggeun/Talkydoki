package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import reactor.core.publisher.Mono;

/**
 * AI 채팅 관련 서비스 인터페이스.
 */
public interface AiChatService {

    /**
     * 새 AI 회화 채팅방을 생성합니다.
     *
     * @param memberId 회화 채팅방을 생성하는 사용자의 ID.
     * @param category 채팅방의 카테고리.
     * @return 생성된 채팅방의 정보를 담은 응답 객체.
     */
    AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category);

    /**
     * 사용자로부터 받은 메시지를 AI 채팅방에 전달합니다.
     *
     * @param memberId 메시지를 보낸 사용자의 ID.
     * @param roomId 메시지를 전달할 채팅방의 ID.
     * @param userMessage 사용자가 보낸 메시지.
     */
    void sendAiChatMessageByUser(Long memberId, Long roomId, AiChatMessage userMessage);

    /**
     * 사용자로부터 받은 메시지를 AI 채팅봇(GPT)에게 전달하여 그에 따른 응답을 처리하고 채팅방에 전달합니다.
     *
     * @param roomId 응답을 전달할 채팅방의 ID.
     * @param userMessage AI 채팅봇에게 전송한 원본 사용자 메시지.
     * @return 작업 완료를 나타내는 Mono<Void> 객체.
     */
    Mono<Void> sendAiChatMessageByGpt(Long roomId, AiChatMessage userMessage);

    /**
     * 카테고리에 맞게 AI 채팅봇(GPT)에 세팅하고 결과를 처리합니다..
     *
     * @param roomId 채팅방의 ID.
     * @param category 대화 설정을 원하는 카테고리
     * @return Mono<Void> 설정 후 작업 완료를 나타내는 Reactive 타입
     */
    Mono<Void> setupAiChatBot(Long roomId, AiChatCategory category);
}
