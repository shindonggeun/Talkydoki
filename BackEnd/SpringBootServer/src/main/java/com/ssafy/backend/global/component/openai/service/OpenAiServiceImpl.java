package com.ssafy.backend.global.component.openai.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.global.component.openai.dto.GptChatCompletionResponse;
import com.ssafy.backend.global.component.openai.dto.GptChatRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class OpenAiServiceImpl implements OpenAiService {

    private final WebClient webClient;  // 외부 API 호출을 위한 Spring WebFlux WebClient

    @Override
    public Mono<String> sendPromptToGpt(AiChatMessage aiChatMessage){
        GptChatRequest gptChatRequest = GptChatRequest.from(aiChatMessage);

        return webClient.post()
                .uri("/completions")
                .bodyValue(gptChatRequest)
                .retrieve()
                .bodyToMono(GptChatCompletionResponse.class)
                .map(response -> response.choices().get(0).message().content());
    }

}

