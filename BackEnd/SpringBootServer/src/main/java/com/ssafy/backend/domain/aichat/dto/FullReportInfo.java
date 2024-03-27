package com.ssafy.backend.domain.aichat.dto;

import java.util.List;

public record FullReportInfo(
        AiChatReportDetailInfo reportDetail,
        List<AiChatAndFeedbackInfo> chatsWithFeedback
) {
}
