package com.ssafy.backend.domain.aichat.dto.api;

public record AiChatReportCreateRequest(
        String conversationSummary,
        Float vocabularyScore,
        Float fluencyScore,
        Float grammarScore,
        Float wordScore,
        Float contextScore
) {
}
