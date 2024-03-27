package com.ssafy.backend.domain.aichat.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record AiChatReportCreateResponse(
        AiChatReportDetailInfo aiChatReportDetailInfo,
        List<AiChatAndFeedbackInfo> aiChatAndFeedbackInfos
) {
}
