package com.ssafy.backend.global.component.oauth.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum OAuthErrorCode {
    NOT_SUPPORT_VENDOR(HttpStatus.BAD_REQUEST, "지원하지 않는 벤더입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
