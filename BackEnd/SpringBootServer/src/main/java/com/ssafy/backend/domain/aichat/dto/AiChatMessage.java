package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;

public record AiChatMessage(
    AiChatSender sender,
    String content
) {
}
