package com.ssafy.backend.global.component.openai;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
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

    public Mono<String> sendPromptToGpt(AiChatMessage aiChatMessage) {
        GptChatRequest gptChatRequest = GptChatRequest.from(aiChatMessage);
        return sendRequestToGpt(gptChatRequest);
    }

    public Mono<String> setupPromptToGpt(AiChatCategory aiChatCategory) {
        GptSetupRequest gptSetupRequest = GptSetupRequest.from(aiChatCategory);
        return sendRequestToGpt(gptSetupRequest);
    }

    public GptThreadCreateResponse createThread() {
        return webClient.post()
                .uri("/threads") // Make sure to use the correct endpoint URL
                .header("OpenAI-Beta", "assistants=v1")
                .retrieve()
                .bodyToMono(GptThreadCreateResponse.class)
                .block();
    }

    private <T> Mono<String> sendRequestToGpt(T requestBody) {
        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(GptChatCompletionResponse.class)
                .map(response -> response.choices().get(0).message().content());
    }

    private GptThreadMessageResponse sendMessageToThread(String threadId) {
        return webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/threads/{threadId}/messages")
                        .build(threadId))
                .header("Content-Type", "application/json")
                .header("OpenAI-Beta", "assistants=v1")
                .retrieve()
                .bodyToMono(GptThreadMessageResponse.class)
                .block();
    }
}
