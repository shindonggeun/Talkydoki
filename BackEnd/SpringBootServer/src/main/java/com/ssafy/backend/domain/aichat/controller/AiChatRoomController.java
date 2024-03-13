package com.ssafy.backend.domain.aichat.controller;


import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreatedResponse;
import com.ssafy.backend.domain.aichat.service.AiChatRoomService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.exception.JwtException;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class AiChatRoomController {

    private final AiChatRoomService aiChatRoomService;
    @PostMapping("/createRoom")
    @Operation(
            summary = "채팅방 생성",
            description = "새로운 채팅방을 생성합니다"
    )
//    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<AiChatRoomCreatedResponse>> createRoom(@AuthenticationPrincipal MemberLoginActive loginActive, @RequestBody @Valid AiChatRoomCreateRequest createRequest){
        try {
//            Long userId = loginActive.id();

            AiChatRoomCreatedResponse createdRoomInfo = aiChatRoomService.createRoom( createRequest);

            // 생성된 roomId와 userId를 사용하여 STOMP 엔드포인트 URL 생성
            String stompEndpoint = String.format("http://localhost:8080/chat-room/%d/%d", createdRoomInfo.id(), createRequest.userId());
            // format 배포 시, 그리고 https 인증 받는 다면
            // 변경해 주어야함!
            // JPA .. .getId(), 그냥 .id() dao, dto 타입에 따라 어떻게 다른지 확인하기!!

            return ResponseEntity.ok(Message.success(createdRoomInfo));

        } catch(JwtException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Message.fail("401", "Invalid or expired token."));
        } catch (AuthenticationException ex){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Message.fail("401","Authentication failed"));
        } catch(AccessDeniedException ex) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Message.fail("403","Access denied"));

        } catch(Exception ex){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Message.fail("500", "An error occurred."));
        }
    }

}


