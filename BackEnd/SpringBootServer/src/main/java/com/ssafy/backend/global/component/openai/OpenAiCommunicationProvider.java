package com.ssafy.backend.global.component.openai;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.global.component.openai.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
@Component
@RequiredArgsConstructor
public class OpenAiCommunicationProvider {

    private final WebClient webClient;

    public Mono<String> sendPromptToGpt(GptChatRequest gptChatRequest) {
        return sendRequestToGpt(gptChatRequest);
    }

    public Mono<String> setupPromptToGpt(AiChatCategory aiChatCategory) {
        GptSetupRequest gptSetupRequest = GptSetupRequest.from(aiChatCategory);
        return sendRequestToGpt(gptSetupRequest);
    }

    private <T> Mono<String> sendRequestToGpt(T requestBody) {
        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GptChatCompletionResponse.class)
                .map(response -> response.choices().get(0).message().content());
    }
}

