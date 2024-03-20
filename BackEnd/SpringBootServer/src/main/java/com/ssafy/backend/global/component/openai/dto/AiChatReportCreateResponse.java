package com.ssafy.backend.global.component.openai.dto;

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
