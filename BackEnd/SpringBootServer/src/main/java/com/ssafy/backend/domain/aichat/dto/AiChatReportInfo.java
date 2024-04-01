package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;

import java.time.LocalDateTime;

public record AiChatReportInfo(
        Long id,
        AiChatCategory category,
        String conversationSummary,
        Float vocabularyScore,
        Float grammarScore,
        Float wordScore,
        Float FluencyScore,
        Float ContextScore,
        LocalDateTime createdAt

) {
}
