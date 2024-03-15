package com.ssafy.backend.domain.news.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum KeywordErrorCode {
    EXIST_KEYWORD(HttpStatus.INTERNAL_SERVER_ERROR, "이미 존재하는 키워드입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
