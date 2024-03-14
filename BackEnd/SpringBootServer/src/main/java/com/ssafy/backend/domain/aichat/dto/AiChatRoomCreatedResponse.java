package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.Category;

public record AiChatRoomCreatedResponse(
        Long id,
        Long userId,
        Category category

) {
    public static AiChatRoomCreatedResponse from (AiChatRoom aiChatRoom){
        return new AiChatRoomCreatedResponse(
                aiChatRoom.getId(),
                aiChatRoom.getMember().getId(),
                aiChatRoom.getCategory()
        );
    }


}
