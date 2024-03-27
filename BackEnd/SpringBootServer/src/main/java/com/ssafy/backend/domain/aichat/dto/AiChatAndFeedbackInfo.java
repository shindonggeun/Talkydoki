package com.ssafy.backend.domain.aichat.dto;

public record AiChatAndFeedbackInfo(
        Long chatId,
        String myAnswer,
        String content

) {
}
