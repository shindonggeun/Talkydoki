package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.ChatCompletionRequest;
import com.ssafy.backend.domain.aichat.dto.api.ChatCompletionResponse;
import com.ssafy.backend.domain.aichat.dto.api.OpenAiMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class OpenAiServiceImpl implements OpenAiService {

    private final WebClient openaiWebClient;
    @Override
    public Mono<String> sendMessage(AiChatMessage createRequest){
        ChatCompletionRequest request = ChatCompletionRequest.convertRequest(createRequest);

        return openaiWebClient.post()
                .uri("/completions")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatCompletionResponse.class)
                .map(response -> response.getChoices().get(0).getMessage().content());
    }
}
