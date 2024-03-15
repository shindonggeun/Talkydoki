package com.ssafy.backend.domain.aichat.controller;


import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
import com.ssafy.backend.domain.aichat.dto.ChatMessage;
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
public class AiChatRoomController {

//    private final AiChatRoomService aiChatRoomService;

    private final AiChatService aiChatService;

//    @PostMapping("/createRoom")
//    @Operation(
//            summary = "채팅방 생성",
//            description = "새로운 채팅방을 생성합니다"
//    )
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
//    public ResponseEntity<Message<CreatedStompEndpointResponse>> createRoom(@AuthenticationPrincipal MemberLoginActive loginActive, @RequestBody @Valid AiChatRoomCreateRequest createRequest){
//        try {
//
//            CreatedStompEndpointResponse createdRoomInfo = aiChatRoomService.createRoom(createRequest);
//
//            // redirect 해줄 수도...
//            return ResponseEntity.ok(Message.success(createdRoomInfo));
//
//        } catch(JwtException ex){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Message.fail("401", "Invalid or expired token."));
//        } catch (AuthenticationException ex){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Message.fail("401","Authentication failed"));
//        } catch(AccessDeniedException ex) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Message.fail("403","Access denied"));
//
//        }
////        catch(Exception ex){
////            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Message.fail("500", "An error occurred."));
////        }
//    }

    @PostMapping("/room/create/{category}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<AiChatRoomCreateResponse>> creatAiChatRoom(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                             @PathVariable AiChatCategory category) {
        AiChatRoomCreateResponse createResponse = aiChatService.creatAiChatRoom(loginActive.id(), category);
        return ResponseEntity.ok().body(Message.success(createResponse));
    }

    @MessageMapping("/{roomId}")
    public void send(Principal principal, AiChatMessage aiChatMessage, @DestinationVariable Long roomId) {
        log.info("메시지 보내기 확인");
        aiChatService.sendMessageAiChat(Long.valueOf(principal.getName()), roomId, aiChatMessage);
    }
}


