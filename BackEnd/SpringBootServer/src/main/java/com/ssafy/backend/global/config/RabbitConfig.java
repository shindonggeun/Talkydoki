package com.ssafy.backend.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit
@RequiredArgsConstructor
public class RabbitConfig {
    private static final String CHAT_QUEUE_NAME = "chat.queue";
    private static final String CHAT_EXCHANGE_NAME = "chat.exchange";
    private static final String ROUTING_KEY = "*.room.*";

    // Initialize Logger instance
    private static final Logger log = LoggerFactory.getLogger(RabbitConfig.class);

    private final ObjectMapper objectMapper;
//    private final MemberRepository memberRepository;
//    private final AiChatRepository aiChatRepository;
    private final AiChatService aiChatService;

    // Queue 등록
    @Bean
    public Queue queue() {
        return new Queue(CHAT_QUEUE_NAME, true);
    }

    // Exchange 등록
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(CHAT_EXCHANGE_NAME);
    }

    // Exchange와 Queue 바인딩
    // 특정 교환기와 큐를 라우팅 키를 기바능로 연결
    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder
                .bind(queue)
                .to(exchange)
                .with(ROUTING_KEY);
    }

    /* register new Bean for Customizing messageConverter */
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setRoutingKey(CHAT_QUEUE_NAME);

        return rabbitTemplate;
    }

    @Bean
    public SimpleMessageListenerContainer container(ConnectionFactory connectionFactory) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(CHAT_QUEUE_NAME);

        container.setMessageListener(message -> {
            String messageBody = new String(message.getBody());
            log.info("Received message: {}", messageBody);

            // 이게 맞는지 Controller에서 하는 것이 맞는 지 확인 필요
//            try {
//                AiChatCreateRequest request = objectMapper.readValue(messageBody,AiChatCreateRequest.class);
//
//                aiChatService.saveChat(request);
//
//            } catch (JsonProcessingException e) {
//                throw new RuntimeException(e);
//            }

        });

        return container;
    }


    // RabbitMQ 서버에 연결하기 위한 ConnectionFactory 설정 제공
    // Spring에서 자동생성 해주는 ConnectionFactory가 아니라 (SimpleConnectionFactory) CahcingConnectionFactory이기에 새로 등록
    @Bean
    public ConnectionFactory connectionFactory(
            @Value("${rabbitmq.host}") String host,
            @Value("${rabbitmq.port}") int port,
            @Value("${rabbitmq.username}") String username,
            @Value("${rabbitmq.password}") String password) {
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setHost(host);
        factory.setPort(port);
        factory.setVirtualHost("/");
        factory.setUsername(username);
        factory.setPassword(password);
        return factory;
    }


    public Jackson2JsonMessageConverter jsonMessageConverter() {

        return new Jackson2JsonMessageConverter();
    }

}

