package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import reactor.core.publisher.Mono;

public interface AiChatService {

    // AI 회화 채팅방 만들기
    AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category);

    // AI 회화 채팅 메시지 보내기 (사용자 - USER)
    void sendAiChatMessageByUser(Long memberId, Long roomId, AiChatMessage userMessage);

    // AI 회화 채팅 메시지 보내기 (AI 회화 채팅봇 - GPT)
    Mono<Void> sendAiChatMessageByGpt(Long roomId, AiChatMessage userMessage);
}
