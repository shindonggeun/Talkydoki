package com.ssafy.backend.global.component.email.service;

public interface EmailService {
    void sendEmailCode(String toEmail);

    void verifyEmailCode(String email, String code);
}
