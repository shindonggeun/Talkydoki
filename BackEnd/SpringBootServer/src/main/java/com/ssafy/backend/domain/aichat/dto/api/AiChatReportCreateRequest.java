package com.ssafy.backend.domain.aichat.dto.api;

public record AiChatReportCreateRequest(
        String conversationSummary,
        Float vocabularyScore,
        Float grammarScore,
        Float wordScore,
        Float contextScore
) {
}
