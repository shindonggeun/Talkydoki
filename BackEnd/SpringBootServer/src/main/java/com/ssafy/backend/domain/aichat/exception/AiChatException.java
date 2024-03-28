package com.ssafy.backend.domain.aichat.exception;

import lombok.Getter;

@Getter
public class AiChatException extends RuntimeException {
    private final AiChatErrorCode errorCode;

    public AiChatException(AiChatErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
