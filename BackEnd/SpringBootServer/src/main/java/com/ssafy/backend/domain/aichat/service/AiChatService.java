package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatInfo;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AiChatService {

    @Transactional(readOnly=true)
    public List<AiChatInfo> getAllMessagesByRoomId(Long userId, Long roomId);

    @Transactional
    public AiChatInfo saveChat(Long userId, Long roomId, AiChatCreateRequest aiChatCreateRequest);

}
