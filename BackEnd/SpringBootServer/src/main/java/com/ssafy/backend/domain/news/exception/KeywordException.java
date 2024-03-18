package com.ssafy.backend.domain.news.exception;

import lombok.Getter;

@Getter
public class KeywordException extends RuntimeException {
    private final KeywordErrorCode errorCode;

    public KeywordException(KeywordErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
