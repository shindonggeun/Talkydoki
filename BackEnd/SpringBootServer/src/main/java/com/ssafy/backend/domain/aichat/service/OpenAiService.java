package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.OpenAiMessage;
import reactor.core.publisher.Mono;

public interface OpenAiService {
    public Mono<String> sendMessage(AiChatMessage createRequest);
}
