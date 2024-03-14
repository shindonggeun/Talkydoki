package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatInfo;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AiChatService {

    @Transactional
    public AiChatInfo saveChat(AiChatCreateRequest aiChatCreateRequest);


    // AI 채팅 회화 방 만들기
    AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category);
}
