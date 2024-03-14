package com.ssafy.backend.global.component.websocket;

import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.exception.JwtErrorCode;
import com.ssafy.backend.global.component.jwt.exception.JwtException;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
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
 * WebSocket 연결 시 인증을 처리하는 인터셉터.
 * CONNECT 또는 SEND 커맨드 수신 시 JWT 토큰을 검증하여 사용자 인증을 수행한다.
 */
@Slf4j
@RequiredArgsConstructor
@Order(Ordered.HIGHEST_PRECEDENCE + 99) // 높은 우선순위 설정
@Component
public class WebSocketAuthenticationInterceptor implements ChannelInterceptor {
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 메시지 전송 전 인증 처리를 수행한다.
     *
     * @param message 메시지 객체
     * @param channel 메시지 채널
     * @return 처리 후 메시지 객체
     * @throws JwtException 토큰 검증 실패 시 발생
     */
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        // CONNECT 또는 SEND 커맨드인 경우 토큰 검증 로직 수행
        if (StompCommand.CONNECT.equals(accessor.getCommand()) || StompCommand.SEND.equals(accessor.getCommand())) {
            validateAndAuthenticateUser(accessor);
        }

        return message;
    }

    /**
     * JWT 토큰을 검증하고 사용자 인증 정보를 설정한다.
     *
     * @param accessor 메시지 헤더 접근기
     */
    private void validateAndAuthenticateUser(StompHeaderAccessor accessor) {
        try {
            String token = accessor.getFirstNativeHeader(HttpHeaders.AUTHORIZATION).substring(7);
            MemberLoginActive member = jwtTokenProvider.parseAccessToken(token);

            log.info("Member connected WebSocket. email : {}, name : {}", member.email(), member.name());

            accessor.setUser(new UserPrincipal(String.valueOf(member.id())));
        } catch (Exception e) {
            throw new JwtException(JwtErrorCode.INVALID_TOKEN);
        }
    }
    
}
