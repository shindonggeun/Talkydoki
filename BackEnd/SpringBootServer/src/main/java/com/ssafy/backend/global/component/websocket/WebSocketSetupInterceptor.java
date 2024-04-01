package com.ssafy.backend.global.component.websocket;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.exception.JwtErrorCode;
import com.ssafy.backend.global.component.jwt.exception.JwtException;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import com.ssafy.backend.global.component.openai.repository.OpenAiRepository;
import com.sun.security.auth.UserPrincipal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpHeaders;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

/**
 * 웹소켓 연결 설정 및 인증을 담당하는 인터셉터입니다.
 * STOMP 연결 및 메시지 전송 시 토큰 검증을 수행하고,
 * 연결 시에는 GPT 프롬프트 설정을 초기화합니다.
 */
@Slf4j
@Component
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99) // 가장 높은 우선 순위를 가지도록 설정하여, 인증 로직이 가장 먼저 수행되게 합니다.
public class WebSocketSetupInterceptor implements ChannelInterceptor {
    private final JwtTokenProvider jwtTokenProvider; // JWT 토큰을 검증하는 컴포넌트
    private final AiChatService aiChatService; // AI 채팅 관련 서비스
    private final OpenAiRepository openAiRepository;

    /**
     * 메시지가 전송되기 전에 인증과 초기 설정을 수행합니다.
     *
     * @param message 클라이언트로부터 받은 메시지 객체
     * @param channel 메시지가 전송될 채널
     * @return 메시지를 그대로 반환하거나 변경하여 반환할 수 있음
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // 연결과 메시지 전송 시 인증 처리를 수행합니다.
        if (StompCommand.CONNECT.equals(accessor.getCommand()) || StompCommand.SEND.equals(accessor.getCommand())) {
            validateAndAuthenticateUser(accessor);
        }

        // 연결 시 GPT 설정을 초기화합니다.
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            String roomIdStr = accessor.getFirstNativeHeader("roomId");
            String categoryStr = accessor.getFirstNativeHeader("category");

            // roomId와 category가 모두 제공되었을 경우에만 GPT 설정을 수행합니다.
            if (roomIdStr != null && categoryStr != null) {
                Long roomId = Long.parseLong(roomIdStr);
                AiChatCategory category = AiChatCategory.valueOf(categoryStr.toUpperCase());

                // Redis에서 기존 설정과 히스토리 삭제
                openAiRepository.deleteAiChatSetupAndHistory(roomId);
                
                // GPT 프롬프트 설정을 비동기적으로 호출합니다.
                aiChatService.setupAiChatBot(roomId, category).subscribe();
            }
        }

        return message;
    }

    /**
     * 토큰을 검증하고 사용자 인증 정보를 설정합니다.
     *
     * @param accessor 메시지 헤더 접근기
     * @throws JwtException 토큰 검증에 실패했을 경우 발생
     */
    private void validateAndAuthenticateUser(StompHeaderAccessor accessor) {
        try {
            // 헤더에서 JWT 토큰을 추출하고 검증합니다.
            String token = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION).substring(7);
            MemberLoginActive member = jwtTokenProvider.parseAccessToken(token);

            // 인증된 사용자의 정보를 로깅합니다.
            log.info("Member connected WebSocket. email : {}, name : {}", member.email(), member.name());

            // 인증 정보를 StompHeaderAccessor에 설정합니다.
            accessor.setUser(new UserPrincipal(String.valueOf(member.id())));
        } catch (Exception e) {
            // 토큰 검증 실패 시 JwtException을 발생시킵니다.
            throw new JwtException(JwtErrorCode.INVALID_TOKEN);
        }
    }

}

