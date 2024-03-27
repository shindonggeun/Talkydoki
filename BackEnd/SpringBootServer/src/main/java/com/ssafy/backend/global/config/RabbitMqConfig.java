package com.ssafy.backend.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.backend.global.component.websocket.RabbitMqProps;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * RabbitMQ 설정을 위한 클래스입니다.
 * @EnableRabbit 애너테이션을 통해 Spring RabbitMQ 지원을 활성화합니다.
 */
@EnableRabbit
@Configuration
@RequiredArgsConstructor
public class RabbitMqConfig {
    private final RabbitMqProps rabbitMqProps;

    // RabbitMQ에서 기본적으로 제공하는 Topic 타입의 Exchange를 사용할 예정
    private static final String TOPIC_EXCHANGE_NAME = "amq.topic";

    // Topic Exchange에 맞는 라우팅 키 지정
    private static final String ROUTING_KEY = "room.*";

    /**
     * 기본 토픽 익스체인지를 정의합니다.
     * @return TopicExchange 객체
     */
    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME);
    }

    /**
     * Topic Exchange와 큐를 바인딩합니다.
     * @return Binding 객체
     */
    @Bean
    public Binding binding() {
        return BindingBuilder
                .bind(topicExchange())
                .to(topicExchange())
                .with(ROUTING_KEY);
    }

    /**
     * RabbitTemplate을 설정합니다. 메시지 변환기를 JsonMessageConverter로 지정합니다.
     * @return RabbitTemplate 객체
     */
    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setRoutingKey(ROUTING_KEY);
        return rabbitTemplate;
    }

    /**
     * 메시지 리스너 컨테이너를 설정합니다. 연결 팩토리를 설정합니다.
     * @return SimpleMessageListenerContainer 객체
     */
    @Bean
    public SimpleMessageListenerContainer container() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory());
        return container;
    }

    /**
     * RabbitMQ 서버에 대한 연결을 생성하는 ConnectionFactory를 정의합니다.
     * @return ConnectionFactory 객체
     */
    @Bean
    public ConnectionFactory connectionFactory() {
        CachingConnectionFactory factory = new CachingConnectionFactory();
        factory.setHost(rabbitMqProps.getHost());
        factory.setUsername(rabbitMqProps.getUsername());
        factory.setPassword(rabbitMqProps.getPassword());
        return factory;
    }

    /**
     * JSON 메시지 변환을 위한 Jackson2JsonMessageConverter를 설정합니다.
     * 날짜와 시간을 타임스탬프로 변환하는 설정 포함.
     * @return Jackson2JsonMessageConverter 객체
     */
    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
        objectMapper.registerModule(dateTimeModule());

        return new Jackson2JsonMessageConverter(objectMapper);
    }

    /**
     * Java 8 날짜와 시간 API 지원을 위한 JavaTimeModule을 반환합니다.
     * @return JavaTimeModule 객체
     */
    @Bean
    public JavaTimeModule dateTimeModule() {
        return new JavaTimeModule();
    }

}