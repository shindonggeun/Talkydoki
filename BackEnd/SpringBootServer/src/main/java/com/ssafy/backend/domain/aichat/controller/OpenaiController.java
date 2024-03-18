package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.ChatCompletionRequest;
import com.ssafy.backend.domain.aichat.dto.api.OpenAiMessage;
import com.ssafy.backend.domain.aichat.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class OpenaiController {
    private final OpenAiService openAiService;

    @PostMapping("/api/v1/gpt")
    public Mono<String> sendMessage(@RequestBody AiChatMessage message){
        return openAiService.sendMessage(message);
    }
}
