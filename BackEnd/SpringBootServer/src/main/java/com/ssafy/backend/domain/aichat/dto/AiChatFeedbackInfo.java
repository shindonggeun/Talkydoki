package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatHistory;

public record AiChatFeedbackInfo(
        Integer id,
        Long roomId,
        AiChatHistory aiChatHistory,
        String content

) {
}
