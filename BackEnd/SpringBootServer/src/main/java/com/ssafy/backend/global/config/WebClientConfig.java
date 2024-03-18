package com.ssafy.backend.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${openai.key}")
    private String openaiApiKey;

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }

    @Bean
    public WebClient openaiWebClient(WebClient.Builder builder) {
        return builder
                .baseUrl("https://api.openai.com/v1/chat")
                .defaultHeader("Authorization", "Bearer " + openaiApiKey)
                .build();
    }
}
