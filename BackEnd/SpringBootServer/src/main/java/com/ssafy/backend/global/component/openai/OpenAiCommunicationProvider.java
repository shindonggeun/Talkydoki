package com.ssafy.backend.global.component.openai;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.global.component.openai.dto.GptChatCompletionResponse;
import com.ssafy.backend.global.component.openai.dto.GptChatRequest;
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

        return webClient.post()
                .uri("/chat/completions")
                .bodyValue(gptChatRequest)
                .retrieve()
                .bodyToMono(GptChatCompletionResponse.class)
                .map(response -> response.choices().get(0).message().content());
    }
}
