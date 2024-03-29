package com.ssafy.backend.global.component.openai;

import com.ssafy.backend.domain.aichat.dto.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.entity.AiChatFeedback;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import com.ssafy.backend.domain.aichat.entity.AiChatReport;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.repository.AiChatFeedbackRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.global.component.openai.dto.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Component
@RequiredArgsConstructor
public class OpenAiCommunicationProvider {

    private final WebClient webClient;
    private final AiChatRoomRepository aiChatRoomRepository;
    private final AiChatReportRepository aiChatReportRepository;
    private final AiChatHistoryRepository aiChatHistoryRepository;
    private final AiChatFeedbackRepository aiChatFeedbackRepository;

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

