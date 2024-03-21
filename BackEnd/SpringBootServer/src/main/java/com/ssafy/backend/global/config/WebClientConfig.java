package com.ssafy.backend.global.config;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.ChatCompletionRequest;
import com.ssafy.backend.domain.aichat.dto.api.OpenAiMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;

@Configuration
public class WebClientConfig {

    @Value("${openai.key}") // application.yml에 값을 설정하여 @Value 어노테이션으로 지정
    private String openaiApiKey;

    // WebCient 인스턴스 생성자
    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    // OpenAI api와 상호작용을 하기위한 메서드를 Bean 등록
    @Bean
    public WebClient openaiWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl("https://api.openai.com/v1/chat")
                .defaultHeader("Authorization", "Bearer " + openaiApiKey)
                .build();
    }
}
