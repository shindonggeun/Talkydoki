package com.ssafy.backend.global.config;

import com.ssafy.backend.global.component.websocket.RabbitMqProps;
import com.ssafy.backend.global.component.websocket.WebSocketSetupInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;

/**
 * Spring 기반의 WebSocket 및 메시지 브로커 설정을 위한 구성 클래스.
 * WebSocket 서버 기능과 STOMP 메시지 브로커를 활성화합니다.
 * RabbitMQ를 메시지 브로커로 사용하며, WebSocket 연결에 대한 인증 처리를 구현합니다.
 */
@Configuration  // @Configuration 어노테이션은 이 클래스가 스프링의 Java 기반 설정을 포함하고 있음을 나타냅니다.
@RequiredArgsConstructor // Lombok 라이브러리를 사용하여 final 필드나 @NonNull 필드에 대한 생성자를 자동으로 생성합니다.
@EnableWebSocketMessageBroker   // @EnableWebSocketMessageBroker 어노테이션을 사용해 WebSocket 메시지 브로커를 활성화합니다.
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final RabbitMqProps rabbitMqProps; // RabbitMQ 연결 설정을 저장하는 프로퍼티 클래스의 인스턴스입니다.
    private final WebSocketSetupInterceptor webSocketSetupInterceptor; // WebSocket 연결 설정 및 인증을 처리하는 인터셉터입니다.

    // 클라이언트가 WebSocket 연결을 시작할 수 있는 엔드포인트를 등록합니다.
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // "/ws" 경로로 엔드포인트를 추가하며, 모든 origin의 요청을 허용합니다.
        registry.addEndpoint("/ws").setAllowedOrigins("*");
    }

    // 메시지 브로커의 설정을 구성합니다.
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // "/pub"를 애플리케이션에서 메시지를 발행할 때 사용할 prefix로 설정합니다.
        // "/users"는 특정 사용자에게 메시지를 보낼 때 사용하는 prefix로 설정합니다.
        registry.setApplicationDestinationPrefixes("/pub")
                .setUserDestinationPrefix("/users")
                .enableStompBrokerRelay("/queue", "/topic", "/exchange", "/amq/queue") // STOMP 메시지 브로커로 RabbitMQ를 사용하기 위한 설정입니다.
                .setRelayHost(rabbitMqProps.getHost()) // RabbitMQ 서버의 호스트 이름을 설정합니다.
                .setVirtualHost("/") // RabbitMQ의 가상 호스트를 설정합니다.
                .setRelayPort(61613) // RabbitMQ 서버의 STOMP 포트를 설정합니다.
                .setSystemLogin(rabbitMqProps.getUsername()) // RabbitMQ 서버에 연결하기 위한 시스템 로그인 아이디를 설정합니다.
                .setSystemPasscode(rabbitMqProps.getPassword()) // RabbitMQ 서버에 연결하기 위한 시스템 패스코드를 설정합니다.
                .setClientLogin(rabbitMqProps.getUsername()) // 클라이언트 로그인 아이디를 설정합니다.
                .setClientPasscode(rabbitMqProps.getPassword()); // 클라이언트 패스코드를 설정합니다.
    }

    // 클라이언트로부터 메시지를 받는 채널에 인터셉터를 구성합니다.
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        // 인증 인터셉터를 클라이언트 인바운드 채널에 추가하여 메시지를 받기 전에 사용자 인증을 수행합니다.
        registration.interceptors(webSocketSetupInterceptor);
    }

    // WebSocket 메시지의 크기 제한을 설정하는 빈을 생성합니다.
    @Bean
    public ServletServerContainerFactoryBean createWebSocketContainer() {
        ServletServerContainerFactoryBean container = new ServletServerContainerFactoryBean();
        container.setMaxTextMessageBufferSize(8192); // 텍스트 메시지의 최대 크기를 바이트 단위로 설정합니다.
        container.setMaxBinaryMessageBufferSize(512 * 1024); // 바이너리 메시지의 최대 크기를 바이트 단위로 설정합니다.
        return container;
    }
}
