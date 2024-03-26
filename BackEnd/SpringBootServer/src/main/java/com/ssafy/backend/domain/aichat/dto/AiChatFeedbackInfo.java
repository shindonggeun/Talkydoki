package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatHistory;

public record AiChatFeedbackInfo(
        Integer id,
        Long roomId,
        Long chatId,
        String myAnswer,
        String content

) {
}
