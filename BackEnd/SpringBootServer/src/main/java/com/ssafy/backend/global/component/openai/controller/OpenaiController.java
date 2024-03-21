package com.ssafy.backend.global.component.openai.controller;

import com.ssafy.backend.global.component.openai.service.OpenAiService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "OpenAi API 호출", description = "OpenAi Api 호출 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class OpenaiController {
    private final OpenAiService openAiService;

//    @Operation(
//            summary = "레포트 생성",
//            description = " RestTemplate을 사용한 OpenAi api를 호출하여 DB 저장 및 ResponseEntity활용한 response를 return합니다."
//    )
//    @PostMapping("/gpt/report/{roomId}")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public ResponseEntity<Message<AiChatReportCreateResponse>> createReport(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long roomId, @RequestBody AiChatConversation request) {
//        AiChatReportCreateResponse response = openAiService.createReport(roomId, request);
//
//        return ResponseEntity.ok().body(Message.success(response));
//    }


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