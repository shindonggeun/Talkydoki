package com.ssafy.backend.global.config;

import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.Configuration;

/**
 * 프로젝트 내의 모든 `@ConfigurationProperties` 어노테이션이 붙은 클래스를 스캔하는 설정 클래스입니다.
 * 이 설정을 통해 프로퍼티 클래스들의 자동 바인딩을 활성화합니다.
 */
@Configuration
@ConfigurationPropertiesScan(basePackages = "com.ssafy")
public class PropertyConfig {
    // 프로퍼티 스캔의 베이스 패키지를 설정합니다.
}
