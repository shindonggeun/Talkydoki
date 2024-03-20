package com.ssafy.backend.global.component.openai.dto;

public record AiChatReportCreateRequest(
        String conversationSummary,
        Float vocabularyScore,
        Float fluencyScore,
        Float grammarScore,
        Float wordScore,
        Float contextScore
) {
}
