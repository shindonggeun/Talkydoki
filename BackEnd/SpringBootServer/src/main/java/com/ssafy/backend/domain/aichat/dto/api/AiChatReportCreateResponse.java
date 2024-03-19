package com.ssafy.backend.domain.aichat.dto.api;

import lombok.Builder;

@Builder
public record AiChatReportCreateResponse(
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
