package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.api.AiChatConversation;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateResponse;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
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

    // RestTemplate을 사용한 OpenAi api 호출
    // DB 저장 및 ResponseEntity활용한 response 제공 가능
    @PostMapping("/gpt/report/{roomId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<AiChatReportCreateResponse>> createReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
        AiChatReportCreateResponse response = openAiService.createReport(roomId, request);

        return ResponseEntity.ok().body(Message.success(response));
    }


    // 아래 두 메서드는 WebClient를 사용하여 OpenAi api 호출
    // 비동기 방식을 사용해 아직 DB에 저장하는 로직 구현 방법 조사 중
//    @PostMapping("/gpt/report/{roomId}")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public Mono<Map<String,Object>> createReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
//        return openAiService.createReport(roomId, request);
//    }
//
//    @PostMapping("/gpt/report/{roomId}/test")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public Mono<AiChatReportCreateResponse> testCreateReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
//        return openAiService.test(roomId, request);
//
//    }
}
