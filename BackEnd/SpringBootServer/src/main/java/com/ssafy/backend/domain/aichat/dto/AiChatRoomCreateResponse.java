package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import lombok.Builder;

@Builder
public record AiChatRoomCreateResponse(
        Long id,
        Long memberId,
        AiChatCategory category

) {
}
