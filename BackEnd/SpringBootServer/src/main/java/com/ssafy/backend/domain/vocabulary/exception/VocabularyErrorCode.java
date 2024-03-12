package com.ssafy.backend.domain.vocabulary.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum VocabularyErrorCode {
    NOT_EXIST_VOCABULARY(HttpStatus.INTERNAL_SERVER_ERROR, "단어장 데이터가 없습니다."),
    DUPLICATE_PERSONAL_VOCABULARY(HttpStatus.BAD_REQUEST, "나만의 단어장에 이미 추가된 단어입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
