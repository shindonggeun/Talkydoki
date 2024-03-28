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
 * RabbitMQ 메시지 큐 설정을 정의하는 클래스입니다.
 * {@link EnableRabbit} 어노테이션은 Spring AMQP를 활성화시킵니다.
 * 이 클래스는 RabbitMQ와의 연결 설정, 메시지 교환, 메시지 변환 방법 등을 구성합니다.
 */
@EnableRabbit
@Configuration
@RequiredArgsConstructor
public class RabbitMqConfig {
    private final RabbitMqProps rabbitMqProps; // RabbitMQ 접속 설정을 담고 있는 프로퍼티 객체

    private static final String TOPIC_EXCHANGE_NAME = "amq.topic"; // 토픽 교환의 이름

    private static final String ROUTING_KEY = "room.*"; // 라우팅 키 패턴

    /**
     * RabbitMQ의 토픽 교환(Topic Exchange)을 정의하고 스프링 빈으로 등록합니다.
     * @return 생성된 TopicExchange 객체
     */
    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME);
    }

    /**
     * 주어진 라우팅 키와 토픽 교환을 바인딩하고, 이 바인딩을 스프링 빈으로 등록합니다.
     * @return 생성된 Binding 객체
     */
    @Bean
    public Binding binding() {
        return BindingBuilder
                .bind(topicExchange())
                .to(topicExchange())
                .with(ROUTING_KEY);
    }

    /**
     * RabbitTemplate을 스프링 빈으로 등록하며, RabbitMQ와의 메시지 송수신을 위한 템플릿을 구성합니다.
     * 메시지 변환기로 Jackson2JsonMessageConverter를 사용하여 메시지를 JSON 형태로 변환합니다.
     * @return 구성된 RabbitTemplate 객체
     */
    @Bean
    public RabbitTemplate rabbitTemplate() {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory());
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        rabbitTemplate.setRoutingKey(ROUTING_KEY);
        return rabbitTemplate;
    }

    /**
     * RabbitMQ의 메시지 리스너 컨테이너를 스프링 빈으로 등록합니다.
     * 이 컨테이너는 메시지 처리를 위한 리스너의 설정을 담당합니다.
     * @return 구성된 SimpleMessageListenerContainer 객체
     */
    @Bean
    public SimpleMessageListenerContainer container() {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory());
        return container;
    }

    /**
     * RabbitMQ 서버와의 연결을 위한 ConnectionFactory를 스프링 빈으로 등록합니다.
     * RabbitMQ 서버의 호스트, 사용자 이름, 비밀번호 등의 접속 정보를 설정합니다.
     * @return 구성된 CachingConnectionFactory 객체
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
     * Jackson2JsonMessageConverter를 스프링 빈으로 등록합니다.
     * 이 컨버터는 메시지를 JSON 형태로 변환하는 데 사용됩니다.
     * Java 8 날짜/시간 API를 올바르게 처리하기 위해 JavaTimeModule을 등록합니다.
     * @return 구성된 Jackson2JsonMessageConverter 객체
     */
    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true);
        objectMapper.registerModule(dateTimeModule());
        return new Jackson2JsonMessageConverter(objectMapper);
    }

    /**
     * JavaTimeModule을 스프링 빈으로 등록합니다.
     * 이 모듈은 Jackson에서 Java 8 날짜/시간 API를 올바르게 처리하는 데 필요합니다.
     * @return 생성된 JavaTimeModule 객체
     */
    @Bean
    public JavaTimeModule dateTimeModule() {
        return new JavaTimeModule();
    }
}
