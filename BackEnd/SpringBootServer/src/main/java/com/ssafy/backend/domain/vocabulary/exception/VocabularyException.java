package com.ssafy.backend.domain.vocabulary.exception;

import lombok.Getter;

@Getter
public class VocabularyException extends RuntimeException {
    private final VocabularyErrorCode errorCode;

    public VocabularyException(VocabularyErrorCode errorCode) {
        super(errorCode.getErrorMessage());
        this.errorCode = errorCode;
    }
}
