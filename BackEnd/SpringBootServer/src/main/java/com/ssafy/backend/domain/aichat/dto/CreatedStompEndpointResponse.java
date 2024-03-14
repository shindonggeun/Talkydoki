package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;

public record CreatedStompEndpointResponse(
        Long id,
        Long userId,
        AiChatCategory category,
        String stompEndpoint

) {
    public static CreatedStompEndpointResponse from (AiChatRoom aiChatRoom, String stompEndpoint){
        return new CreatedStompEndpointResponse(
                aiChatRoom.getId(),
                aiChatRoom.getMember().getId(),
                aiChatRoom.getCategory(),
                stompEndpoint
        );
    }
}
