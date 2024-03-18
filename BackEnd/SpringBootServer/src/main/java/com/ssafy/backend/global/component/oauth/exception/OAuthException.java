package com.ssafy.backend.global.component.oauth.exception;

import lombok.Getter;

@Getter
public class OAuthException extends RuntimeException {
    private final OAuthErrorCode errorCode;

    public OAuthException(OAuthErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}

