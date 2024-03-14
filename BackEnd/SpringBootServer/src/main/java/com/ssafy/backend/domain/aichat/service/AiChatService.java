package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;

public interface AiChatService {

//    @Transactional
//    public AiChatInfo saveChat(AiChatCreateRequest aiChatCreateRequest);


    // AI 회화 채팅방 만들기
    AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category);

    // AI 회화 채팅 메시지 보내기
    void sendMessageAiChat(Long memberId, Long roomId, AiChatMessage messageRequest);
}
