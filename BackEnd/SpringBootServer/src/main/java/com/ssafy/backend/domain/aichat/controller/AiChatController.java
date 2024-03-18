package com.ssafy.backend.domain.aichat.controller;


import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/ai/chat")
public class AiChatController {

    private final AiChatService aiChatService;

    @PostMapping("/room/create/{category}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<AiChatRoomCreateResponse>> creatAiChatRoom(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                             @PathVariable AiChatCategory category) {
        AiChatRoomCreateResponse createResponse = aiChatService.creatAiChatRoom(loginActive.id(), category);
        return ResponseEntity.ok().body(Message.success(createResponse));
    }

    @MessageMapping("/ai/chat/{roomId}")
    public void send(Principal principal, AiChatMessage aiChatMessage, @DestinationVariable Long roomId) {
        aiChatService.sendMessageAiChat(Long.valueOf(principal.getName()), roomId, aiChatMessage);
    }
}


