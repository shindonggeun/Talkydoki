package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.dto.AiChatAndFeedbackInfo;

import java.util.List;

public interface AiChatFeedbackRepositoryCustom {

    List<AiChatAndFeedbackInfo> getAiChatFeedbackInfo(Long roomId);
}
