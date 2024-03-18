package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import com.ssafy.backend.domain.aichat.service.AiChatServiceImpl;
import lombok.Builder;

@Builder
public record AiChatMessage(
    AiChatSender sender,
    String content
) {
}
