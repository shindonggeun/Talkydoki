package com.ssafy.backend.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * OpenAI와의 통신을 위한 WebClient 구성 클래스입니다.
 * 이 클래스는 OpenAI API에 접근하기 위해 사용되는 WebClient 인스턴스를 구성하고 제공합니다.
 */
@Slf4j
@Configuration
public class OpenAiConfig {

    @Value("${openai.key}")
    private String openAiKey; // OpenAI API를 사용하기 위한 API 키

    /**
     * OpenAI API 요청을 위한 WebClient를 구성하고 빈으로 등록합니다.
     * WebClient는 비동기, 논블로킹 I/O를 지원하는 Spring WebFlux의 일부로,
     * RESTful API 호출에 사용됩니다. 이 메소드는 OpenAI API에 요청을 보내는 데 필요한
     * 기본 URL과 인증 헤더를 설정합니다.
     *
     * @return 구성된 WebClient 인스턴스
     */
    @Bean
    public WebClient openAiWebClient() {
        // WebClient 인스턴스를 생성하고 기본 설정을 적용합니다.
        return WebClient.builder()
                .baseUrl("https://api.openai.com/v1") // OpenAI API의 기본 URL 설정
                .defaultHeader("Authorization", "Bearer " + openAiKey) // API 요청 시 사용될 기본 인증 헤더 설정
                .build();
    }
}

