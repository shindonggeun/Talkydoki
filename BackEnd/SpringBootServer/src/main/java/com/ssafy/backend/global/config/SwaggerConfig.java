package com.ssafy.backend.global.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger API 문서화를 위한 설정 클래스입니다.
 * 이 클래스는 Spring Boot 애플리케이션의 REST API를 문서화하기 위해
 * OpenAPI 3.0 명세를 정의합니다. {@code @OpenAPIDefinition} 애너테이션을
 * 사용하여 API의 기본 정보를 설정하고, API 문서의 제목, 설명 및 버전을 명시합니다.
 * '토키도키(Tokidoki)' 애플리케이션은 Spring Boot 기반 서버에서 동작하며,
 * 이 문서는 해당 서버의 API 명세를 제공합니다.
 */
@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "토키도키(Tokidoki) API 명세서",
                description = "Spring boot Server 전용",
                version = "v1"
        )
)
public class SwaggerConfig {
    // 클래스 구현 내용
}
