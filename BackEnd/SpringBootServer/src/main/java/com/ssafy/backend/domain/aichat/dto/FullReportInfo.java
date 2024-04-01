package com.ssafy.backend.domain.aichat.dto;

import java.util.List;

public record FullReportInfo(
        AiChatReportInfo reportDetail,
        List<AiChatAndFeedbackInfo> chatsWithFeedback
) {
}
