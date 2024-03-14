package com.ssafy.backend.global.config;

import jakarta.websocket.ContainerProvider;
import jakarta.websocket.WebSocketContainer;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class StompWebSocketConfig implements WebSocketMessageBrokerConfigurer {


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 이 엔드 포인트는 필요가 없을 것 같다... 나중에 지우기
        registry.addEndpoint("/chat") // ws
                .setAllowedOriginPatterns("*") // 일단 개발 단계니까 전체 허용
                .withSockJS();

        // roomId와 userId를 사용하는 엔드포인트 추가
        // 사실 userId까지는 필요 없을 듯하지만 일단 추가
        // 그리고 생각해봐서 roomId,userId에 대한 엔드포인트 설정 시
        // 원본 데이터를  암호화해서(해시..? return 타입 정수)
        // 설정해 줄 수도 있겠다.
        registry.addEndpoint("/chat-room.{roomId}")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    // pub / sub 개념 확인하기..
    /**
     * @"/app"은  WebSocket(or SockJS) client 가 WebScoket handshsake 를 위한 연결에 필요한 endpoint입니다.
     * destination header가 /app 으로 시작하는 메세지들은
     * @Controller클래스의 @MessageMapping 메서드들에 라우팅됩니다.
     * 내장 메세지 브로커를 사용하여  destination header 에 따라 메세지들을 구독, 브로드캐스팅 그리고 라우팅할 수 있습니다.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry){
        registry.setPathMatcher(new AntPathMatcher(".")); // URL / -> . 으로...?
        registry.enableStompBrokerRelay("/queue","/topic","/exchange", "/amq/queue");
        registry.setApplicationDestinationPrefixes("/app");

    }

    // WebSocket Transport

    /** Jakarta WebSocket servers는
     아래와 같은 config를 추가해
     input message buffer size, idle timeout 등과 같은 설정들을 할 수 있음
     */
    @Bean
    public WebSocketContainer webSocketContainer(){
        WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        container.setDefaultMaxTextMessageBufferSize(8192);
        container.setDefaultMaxBinaryMessageBufferSize(8192);
        //추가 설정 가능
        return container;
    }

    /**
     * WebSocket server properties에 더해 STOMP Websocket transport properties도
     * 아래와 같이 customize 가능하다
     */
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registry){
        registry.setMessageSizeLimit(4 * 8192);
        registry.setTimeToFirstMessage(30000);
    }
}
