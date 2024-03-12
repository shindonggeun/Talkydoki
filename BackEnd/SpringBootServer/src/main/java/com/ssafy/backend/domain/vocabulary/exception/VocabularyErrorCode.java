package com.ssafy.backend.domain.vocabulary.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum VocabularyErrorCode {
    NOT_EXIST_VOCABULARY(HttpStatus.NOT_FOUND, "단어장 데이터가 없습니다."),
    DUPLICATE_PERSONAL_VOCABULARY(HttpStatus.BAD_REQUEST, "나만의 단어장에 이미 추가된 단어입니다."),
    NOT_EXIST_PERSONAL_VOCABULARY(HttpStatus.NOT_FOUND ,"나만의 단어장에 존재하지 않는 데이터입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
