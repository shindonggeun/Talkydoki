package com.ssafy.backend.global.component.email.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class EmailRepository {
    private final RedisTemplate<String, String> redisTemplate;

    private static final String EMAIL_SIGNUP_CODE = "signupCode::";

    public void save(String email, String signupCode, int expiresMin) {
        String key = EMAIL_SIGNUP_CODE + email;
        redisTemplate.opsForValue().set(key, signupCode);
        redisTemplate.expire(key, expiresMin, TimeUnit.MINUTES);
    }

    public Optional<String> findSignupCode(String email) {
        String signupCode = redisTemplate.opsForValue().get(EMAIL_SIGNUP_CODE + email);
        return Optional.ofNullable(signupCode);
    }

    public void deleteSignupCode(String email) {
        redisTemplate.delete(EMAIL_SIGNUP_CODE + email);
    }
}
