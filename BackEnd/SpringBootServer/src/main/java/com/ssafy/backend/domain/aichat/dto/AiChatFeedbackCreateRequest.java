package com.ssafy.backend.domain.aichat.dto;

public record AiChatFeedbackCreateRequest(
        Long chatId,
        String content
) {
}
