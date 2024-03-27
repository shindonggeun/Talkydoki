package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;

public record AiChatAndFeedbackInfo(
        Long chatId,
        AiChatSender sender,
        String message,
        String feedback

) {
}
