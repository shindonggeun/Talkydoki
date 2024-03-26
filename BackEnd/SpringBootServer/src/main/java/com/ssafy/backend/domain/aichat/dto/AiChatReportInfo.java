package com.ssafy.backend.domain.aichat.dto;

public record AiChatReportInfo(
        Long id,
        Long aiChatRoomId,
        String conversationSummary,
        Float vocabularyScore,
        Float grammarScore,
        Float wordScore,
        Float FluencyScore,
        Float ContextScore
) {
}
