package com.ssafy.backend.global.config;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Jasypt 암호화 설정을 정의하는 구성 클래스입니다.
 * 이 클래스는 암호화를 위한 빈을 제공하여 애플리케이션의 민감한 정보를 안전하게 관리할 수 있도록 합니다.
 */
@Configuration
public class JasyptConfig {

    @Value("${jasypt.encryptor.key}")
    private String password; // Jasypt 암호화 키

    /**
     * Jasypt 문자열 암호화를 위한 빈을 생성합니다.
     * 암호화에 사용되는 구성 설정을 정의합니다.
     *
     * @return 구성된 StringEncryptor 빈
     */
    @Bean("jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        config.setPassword(password); // 암호화 키 설정
        config.setAlgorithm("PBEWithMD5AndDES"); // 암호화 알고리즘 설정
        config.setKeyObtentionIterations("1000"); // 키 생성 반복 횟수 설정
        config.setPoolSize("1"); // 암호화 풀 크기 설정
        config.setProviderName("SunJCE"); // 암호화 제공자 설정
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator"); // 솔트 생성기 클래스 설정
        config.setIvGeneratorClassName("org.jasypt.iv.NoIvGenerator"); // IV 생성기 클래스 설정
        config.setStringOutputType("base64"); // 암호화된 문자열 출력 형식 설정
        encryptor.setConfig(config); // 설정된 구성으로 암호화 객체 초기화

        return encryptor; // 구성된 암호화 객체 반환
    }
}
