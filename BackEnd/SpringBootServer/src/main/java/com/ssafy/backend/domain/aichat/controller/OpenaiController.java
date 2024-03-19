package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class OpenaiController {
    private final OpenAiService openAiService;

    @PostMapping("/gpt")
    public Mono<String> sendMessage(@RequestBody AiChatMessage message){
        return openAiService.sendMessage(message);
    }

    @PostMapping("/gpt/report")
    public Mono<Map<String,Object>> createReport(@RequestBody AiChatReportCreateRequest request) {
        return openAiService.createReport(request);
    }
}
