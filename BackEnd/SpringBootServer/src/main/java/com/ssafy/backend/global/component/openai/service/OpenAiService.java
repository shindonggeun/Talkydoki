package com.ssafy.backend.global.component.openai.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import reactor.core.publisher.Mono;

public interface OpenAiService {

    Mono<String> sendPromptToGpt(AiChatMessage aiChatMessage);

}
