package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.*;
import com.ssafy.backend.domain.aichat.entity.AiChatReport;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAiServiceImpl implements OpenAiService {

    private final WebClient openaiWebClient;
    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
//            = new ObjectMapper(); // @Re..Consturctor 있으니까 이게 맞을 듯
//    = new ObjectMapper();

    private final AiChatReportRepository aiChatReportRepository;
    private final AiChatRoomRepository aiChatRoomRepository;


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

    @Override
    public AiChatReportCreateResponse createReport(Long roomId, AiChatConversation aiChatConversation) {

        AiChatReportCreateApiRequest request = AiChatReportCreateApiRequest.convertRequest(aiChatConversation);

        ChatCompletionResponse chatCompletionResponse = restTemplate.postForObject(
                "https://api.openai.com/v1/chat/completions",
                request,
                ChatCompletionResponse.class
        );

        String content = chatCompletionResponse.getChoices().get(0).getMessage().content();

        try {
            AiChatReportCreateRequest reportRequest = objectMapper.readValue(content, AiChatReportCreateRequest.class);

            AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Cant' find the room with id : " + roomId));

            AiChatReport aiChatReport = AiChatReport.builder()
                    .aiChatRoom(aiChatRoom)
                    .conversationSummary(reportRequest.conversationSummary())
                    .vocabularyScore(reportRequest.vocabularyScore())
                    .wordScore(reportRequest.wordScore())
                    .grammarScore(reportRequest.grammarScore())
                    .fluencyScore(reportRequest.fluencyScore())
                    .contextScore(reportRequest.contextScore())
                    .build();
            aiChatReportRepository.save(aiChatReport);

            return  new AiChatReportCreateResponse(aiChatReport.getId(), roomId, aiChatReport.getConversationSummary(), aiChatReport.getVocabularyScore(), aiChatReport.getGrammarScore(), aiChatReport.getWordScore(), aiChatReport.getFluencyScore(), aiChatReport.getContextScore());
        } catch (JsonProcessingException e){
            throw new RuntimeException("JSON 변환 실패", e);
        }
    }


//    @Override
//    public Mono<Map<String, Object>> createReport(Long roomId, AiChatConversation aiChatConversation) {
//        AiChatReportCreateApiRequest request = AiChatReportCreateApiRequest.convertRequest(aiChatConversation);
//
//
//        return openaiWebClient.post()
//                .uri("/completions")
//                .bodyValue(request)
//                .retrieve()
//                .bodyToMono(ChatCompletionResponse.class)
//                .map(res -> {
//                    try {
//                        String content = res.getChoices().get(0).getMessage().content();
//                        // JSON 문자열을 Map으로 변환
//                        return objectMapper.readValue(content, new TypeReference<Map<String, Object>>() {});
//                    } catch (JsonProcessingException e){
//                        throw new RuntimeException("JSON 변환 실패", e);
//                    }
//                });
//    }
//
//
//    @Override
//    public Mono<AiChatReportCreateResponse> test(Long roomId, AiChatConversation aiChatConversation) {
//        AiChatReportCreateApiRequest request = AiChatReportCreateApiRequest.convertRequest(aiChatConversation);
//
//
//        return openaiWebClient.post()
//                .uri("/completions")
//                .bodyValue(request)
//                .retrieve()
//                .bodyToMono(ChatCompletionResponse.class)
//                .map(res -> {
//                    try {
//                        String content = res.getChoices().get(0).getMessage().content();
//                        // JSON 문자열을 Map으로 변환
//                        return objectMapper.readValue(content, AiChatReportCreateResponse.class);
//                    } catch (JsonProcessingException e){
//                        throw new RuntimeException("JSON 변환 실패", e);
//                    }
//                });
//    }
}

