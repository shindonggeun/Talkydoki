package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;

public record AiChatReportInfo(
        Long reportId,
        AiChatCategory category
) {
}
