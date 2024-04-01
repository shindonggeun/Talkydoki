package com.ssafy.backend.global.component.email.service;

import reactor.core.publisher.Mono;


/**
 * 이메일 관련 서비스를 정의한 인터페이스입니다.
 * 이메일 인증 코드 발송과 인증 코드 검증의 기능을 제공합니다.
 */
public interface EmailService {

    /**
     * 주어진 이메일 주소로 이메일 인증 코드를 발송합니다.
     *
     * @param toEmail 인증 코드를 받을 이메일 주소
     */
    Mono<Void> sendEmailCode(String toEmail);

    /**
     * 제공된 이메일 주소와 인증 코드를 검증합니다.
     *
     * @param email 검증할 이메일 주소
     * @param code 검증할 인증 코드
     */
    void verifyEmailCode(String email, String code);
}

