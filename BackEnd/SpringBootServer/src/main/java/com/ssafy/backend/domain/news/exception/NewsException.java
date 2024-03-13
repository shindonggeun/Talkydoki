package com.ssafy.backend.domain.news.exception;

import lombok.Getter;

@Getter
public class NewsException extends RuntimeException {
    private final NewsErrorCode errorCode;
    public NewsException(NewsErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
