package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.AiChatConversation;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateResponse;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface OpenAiService {
    public Mono<String> sendMessage(AiChatMessage createRequest);

    public Mono<Map<String, Object>> createReport(Long roomId, AiChatConversation aiChatConversation);

//    public Mono<AiChatReportCreateRequest> createReport(AiChatConversation aiChatConversation);

//    public Mono<AiChatReportCreateResponse> saveReport(Long roomId, AiChatConversation aiChatConversation);

}
