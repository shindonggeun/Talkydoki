package com.ssafy.backend.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Slf4j
@Configuration
public class OpenAiConfig {

    @Value("${openai.key}")
    private String openAiKey;

    @Bean
    public WebClient openAiWebClient() {
        // WebClient 인스턴스를 생성하고 설정합니다.
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + openAiKey)
                .build();
    }
}
