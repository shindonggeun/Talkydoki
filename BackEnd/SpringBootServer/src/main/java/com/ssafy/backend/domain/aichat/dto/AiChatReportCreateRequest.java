package com.ssafy.backend.domain.aichat.dto;

public record AiChatReportCreateRequest(
        String conversationSummary,
        Float vocabularyScore,
        Float fluencyScore,
        Float grammarScore,
        Float wordScore,
        Float contextScore
) {
}
