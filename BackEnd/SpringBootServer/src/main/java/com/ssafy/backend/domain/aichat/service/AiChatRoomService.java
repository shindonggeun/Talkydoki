package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreatedResponse;
import com.ssafy.backend.domain.aichat.dto.CreatedStompEndpointResponse;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AiChatRoomService {

    @Transactional
    CreatedStompEndpointResponse createRoom(AiChatRoomCreateRequest createRequest);

    @Transactional(readOnly = true)
    public List<AiChatRoomCreatedResponse> getAllRooms(Long userId);
}
