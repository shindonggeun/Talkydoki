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
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OpenAiServiceImpl implements OpenAiService {

    private final WebClient openaiWebClient;
    private final ObjectMapper objectMapper = new ObjectMapper();


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
    public Mono<Map<String, Object>> createReport(Long roomId, AiChatConversation aiChatConversation) {
        AiChatReportCreateApiRequest request = AiChatReportCreateApiRequest.convertRequest(aiChatConversation);


        return openaiWebClient.post()
                .uri("/completions")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(ChatCompletionResponse.class)
                .map(res -> {
                    try {
                        String content = res.getChoices().get(0).getMessage().content();
                        // JSON 문자열을 Map으로 변환
                        return objectMapper.readValue(content, new TypeReference<Map<String, Object>>() {});
                    } catch (JsonProcessingException e){
                        throw new RuntimeException("JSON 변환 실패", e);
                    }
                });
    }

//    @Override
//    public Mono<AiChatReportCreateRequest> createReport(AiChatConversation aiChatConversation) {
//
//
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
//                        return objectMapper.readValue(content, AiChatReportCreateRequest.class);
//
//                    } catch (JsonProcessingException e){
//                        throw new RuntimeException("JSON 변환 실패", e);
//                    }
//                });
//    }

//    private final AiChatRoomRepository aiChatRoomRepository;
//    private final AiChatReportRepository aiChatReportRepository;
//    @Override
//    public Mono<AiChatReportCreateResponse> saveReport(Long roomId, AiChatConversation aiChatConversation) {
//        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(() -> new IllegalArgumentException("Room not found with the id: "+roomId));
//
//
//        return null;
//    }


//    @Override
//    public AiChatReportCreateResponse createReport(Long userId, Long roomId, Mono<Map<String, Object>> gptReport) {
////        AiChatReportCreateResponse response = new AiChatReportCreateResponse(
////                userId, roomId
////        )
//
//                return null;
//    }

}
