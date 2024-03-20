package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.api.AiChatConversation;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.service.OpenAiService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class OpenaiController {
    private final OpenAiService openAiService;

//    @PostMapping("/gpt")
//    public Mono<String> sendMessage(@RequestBody AiChatMessage message){
//        return openAiService.sendMessage(message);
//    }

    @PostMapping("/gpt/report/{roomId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public Mono<Map<String,Object>> createReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
        return openAiService.createReport(roomId, request);
    }

//    @PostMapping("/gpt/report/{roomId}")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public ResponseEntity<Message<Mono<AiChatReportCreateRequest>>> createReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
//        Mono<AiChatReportCreateRequest> response =  openAiService.createReport(request);
//
//        return ResponseEntity.ok().body(Message.success(response));
//    }
}
