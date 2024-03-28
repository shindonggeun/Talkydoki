package com.ssafy.backend.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * 메일 서비스 구성을 위한 설정 클래스입니다.
 * 이 클래스는 Spring의 JavaMailSender를 사용하여 메일 서비스를 구성합니다.
 * application.properties 파일에서 메일 서버 관련 설정을 읽어들여 JavaMailSender를 구성하고 빈으로 등록합니다.
 */
@Configuration
public class MailConfig {

    @Value("${spring.mail.host}")
    private String host;  // 메일 서버 호스트 주소

    @Value("${spring.mail.port}")
    private int port;  // 메일 서버 포트 번호

    @Value("${spring.mail.username}")
    private String username;  // 메일 서버 사용자 이름

    @Value("${spring.mail.password}")
    private String password;  // 메일 서버 비밀번호

    @Value("${spring.mail.properties.mail.smtp.auth}")
    private boolean smtpAuth;  // SMTP 인증 사용 여부

    @Value("${spring.mail.properties.mail.smtp.starttls.enable}")
    private boolean starttlsEnable;  // STARTTLS 사용 여부

    /**
     * Spring의 JavaMailSender 인터페이스의 구현체인 JavaMailSenderImpl을 구성하고 빈으로 등록합니다.
     * 이 메소드는 메일 전송에 필요한 기본 설정(서버 호스트, 포트, 사용자 이름, 비밀번호)을 구성합니다.
     * 또한, SMTP 인증과 STARTTLS 사용 여부를 메일 속성으로 설정합니다.
     *
     * @return 구성된 JavaMailSender 인스턴스
     */
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);  // 메일 서버 호스트 설정
        mailSender.setPort(port);  // 메일 서버 포트 설정
        mailSender.setUsername(username);  // 메일 서버 사용자 이름 설정
        mailSender.setPassword(password);  // 메일 서버 비밀번호 설정

        // 메일 서버의 추가 설정을 위한 Properties 객체
        Properties mailProperties = mailSender.getJavaMailProperties();
        mailProperties.put("mail.smtp.auth", smtpAuth);  // SMTP 인증 활성화 설정
        mailProperties.put("mail.smtp.starttls.enable", starttlsEnable);  // STARTTLS 활성화 설정

        mailSender.setJavaMailProperties(mailProperties);

        return mailSender;
    }
}