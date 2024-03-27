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

    @Transactional
    public Mono<Void> saveReport(Long roomId, AiChatReportCreateRequest reportRequest) {
        return getAiChatReportCreateResponseMono(roomId, reportRequest, aiChatRoomRepository, aiChatReportRepository, aiChatHistoryRepository, aiChatFeedbackRepository);
    }

    public Mono<Void> getAiChatReportCreateResponseMono(Long roomId, AiChatReportCreateRequest reportRequest, AiChatRoomRepository aiChatRoomRepository, AiChatReportRepository aiChatReportRepository, AiChatHistoryRepository aiChatHistoryRepository, AiChatFeedbackRepository aiChatFeedbackRepository) {
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Can't find the aiChatRoom with id: " + roomId)))
                .subscribeOn(Schedulers.boundedElastic())
                .flatMap(aiChatRoom -> {
                    AiChatReport report = AiChatReport.builder()
                            .aiChatRoom(aiChatRoom)
                            .conversationSummary(reportRequest.conversationSummary())
                            .vocabularyScore(reportRequest.vocabularyScore())
                            .wordScore(reportRequest.wordScore())
                            .grammarScore(reportRequest.grammarScore())
                            .fluencyScore(reportRequest.fluencyScore())
                            .contextScore(reportRequest.contextScore())
                            .build();

                    return Mono.fromCallable(() -> aiChatReportRepository.save(report))
                            .subscribeOn(Schedulers.boundedElastic())
                            .thenMany(Flux.fromIterable(reportRequest.feedbacks())
                                    .publishOn(Schedulers.boundedElastic()) // 각 피드백 처리를 별도의 스레드에서 수행
                                    .flatMap(feedback ->
                                            Mono.fromCallable(() -> {
                                                AiChatHistory aiChatHistory = aiChatHistoryRepository.findById(feedback.chatId())
                                                        .orElseThrow(() -> new RuntimeException("Can't find the chat"));
                                                AiChatFeedback aiChatFeedback = AiChatFeedback.builder()
//                                                        .aiChatRoom(aiChatRoom)
                                                        .aiChatHistory(aiChatHistory)
                                                        .content(feedback.content())
                                                        .build();
                                                return aiChatFeedbackRepository.save(aiChatFeedback);
                                            }).subscribeOn(Schedulers.boundedElastic())
                                    )).then();
                });
    }
}

