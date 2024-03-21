package com.ssafy.backend.global.component.openai.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
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
    private final ObjectMapper objectMapper;
    private final AiChatReportRepository aiChatReportRepository;
    private final AiChatRoomRepository aiChatRoomRepository;


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

//    @Override
//    public AiChatReportCreateResponse createReport(Long roomId, AiChatConversation aiChatConversation) {
//
//        AiChatReportCreateApiRequest request = AiChatReportCreateApiRequest.convertRequest(aiChatConversation);
//
//        ChatCompletionResponse chatCompletionResponse = restTemplate.postForObject(
//                "https://api.openai.com/v1/chat/completions",
//                request,
//                ChatCompletionResponse.class
//        );
//
//        String content = chatCompletionResponse.getChoices().get(0).getMessage().content();
//
//        try {
//            AiChatReportCreateRequest reportRequest = objectMapper.readValue(content, AiChatReportCreateRequest.class);
//
//            AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Cant' find the room with id : " + roomId));
//
//            AiChatReport aiChatReport = AiChatReport.builder()
//                    .aiChatRoom(aiChatRoom)
//                    .conversationSummary(reportRequest.conversationSummary())
//                    .vocabularyScore(reportRequest.vocabularyScore())
//                    .wordScore(reportRequest.wordScore())
//                    .grammarScore(reportRequest.grammarScore())
//                    .fluencyScore(reportRequest.fluencyScore())
//                    .contextScore(reportRequest.contextScore())
//                    .build();
//            aiChatReportRepository.save(aiChatReport);
//
//            return  new AiChatReportCreateResponse(aiChatReport.getId(), roomId, aiChatReport.getConversationSummary(), aiChatReport.getVocabularyScore(), aiChatReport.getGrammarScore(), aiChatReport.getWordScore(), aiChatReport.getFluencyScore(), aiChatReport.getContextScore());
//        } catch (JsonProcessingException e){
//            throw new RuntimeException("JSON 변환 실패", e);
//        }
//    }


}

