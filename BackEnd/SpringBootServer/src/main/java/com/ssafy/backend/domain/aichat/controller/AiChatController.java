package com.ssafy.backend.domain.aichat.controller;


import com.ssafy.backend.domain.aichat.dto.*;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import com.ssafy.backend.global.component.openai.dto.Conversation;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.security.Principal;

@Tag(name = "Ai 회화 채팅", description = "AI 회화 채팅 관련 API 입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ai/chat")
public class AiChatController {
    private final AiChatService aiChatService;

    @Operation(
            summary = "AI 회화 채팅방 만들기",
            description = "해당 대화 카테고리를 선택하여 AI 회화 채팅방을 생성하는 기능입니다."
    )
    @PostMapping("/room/create/{category}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<AiChatRoomCreateResponse>> creatAiChatRoom(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                             @PathVariable AiChatCategory category) {
        AiChatRoomCreateResponse createResponse = aiChatService.creatAiChatRoom(loginActive.id(), category);
        return ResponseEntity.ok().body(Message.success(createResponse));
    }

    @MessageMapping("/ai/chat/user/{roomId}")
    public void sendAiChatMessageByUser(Principal principal, AiChatMessage aiChatMessage,
                                        @DestinationVariable Long roomId) {
        aiChatService.sendAiChatMessageByUser(Long.valueOf(principal.getName()), roomId, aiChatMessage);
    }

//    @PostMapping("/gpt/{roomId}")
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public Mono<ResponseEntity<Message<Conversation>>> sendAiChatMessageByGpt(@PathVariable Long roomId,
//                                                                      @RequestBody AiChatMessage userMessage) {
//        return aiChatService.sendAiChatMessageByGpt(roomId, userMessage)
//                .map(conversation -> ResponseEntity.ok().body(Message.success(conversation)));
//    }

    @PostMapping("/gpt/setup/{roomId}/{category}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public Mono<ResponseEntity<Message<Conversation>>> setupAiChatBot(@PathVariable Long roomId,
                                                                      @PathVariable AiChatCategory category) {
        return aiChatService.setupAiChatBot(roomId, category)
                .map(conversation -> ResponseEntity.ok().body(Message.success(conversation)));
    }
}


