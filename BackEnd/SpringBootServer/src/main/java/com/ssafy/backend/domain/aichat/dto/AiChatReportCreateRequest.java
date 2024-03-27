package com.ssafy.backend.domain.aichat.dto;

import java.util.List;

public record AiChatReportCreateRequest(
        String conversationSummary,
        Float vocabularyScore,
        Float fluencyScore,
        Float grammarScore,
        Float wordScore,
        Float contextScore,
        List<AiChatFeedbackCreateRequest> feedbacks
) {
}
