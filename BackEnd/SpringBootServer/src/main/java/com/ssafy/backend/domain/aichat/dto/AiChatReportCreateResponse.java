package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatFeedback;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import lombok.Builder;

import java.util.List;

@Builder
public record AiChatReportCreateResponse(
        AiChatReportInfo aiChatReportInfo,
        List<AiChatFeedbackInfo> aiChatFeedbackInfos
) {
}
