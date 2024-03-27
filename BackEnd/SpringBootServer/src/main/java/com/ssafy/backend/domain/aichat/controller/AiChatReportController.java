package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.AiChatReportInfo;
import com.ssafy.backend.domain.aichat.dto.FullReportInfo;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@Tag(name = "Ai Chatting", description = "AiChatting 관련 API 입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/report")
public class AiChatReportController {
    private final AiChatService aiChatService;

    @PostMapping("/gpt/{roomId}")
    public Mono<ResponseEntity<Message<Void>>> createReportByGPT(@PathVariable Long roomId) {
        return aiChatService.createReport(roomId)
                .then(Mono.just(ResponseEntity.ok(Message.success(null))));
    }

    @Operation(
            summary = "유저의 report 조회",
            description = "유저의 레포트들을 조회하는 기능입니다."
    )
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("")
    public ResponseEntity<Message<List<AiChatReportInfo>>> getUserReports(@AuthenticationPrincipal MemberLoginActive loginActive){

        List<AiChatReportInfo> aiChatReports = aiChatService.getUserReports(loginActive.id());
        return ResponseEntity.ok().body(Message.success(aiChatReports));
    }

    @Operation(
            summary = "해당 report의 detail 조회",
            description = "유저의 레포트의 평가 내용과 채팅에 대한 피드백들을 조회합니다"
    )
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    @GetMapping("/{reportId}")
    public ResponseEntity<Message<FullReportInfo>> getReportDetail(@PathVariable Long reportId){
        FullReportInfo reportDetail = aiChatService.getReportDetail(reportId);

        return ResponseEntity.ok().body(Message.success(reportDetail));
    }
}
