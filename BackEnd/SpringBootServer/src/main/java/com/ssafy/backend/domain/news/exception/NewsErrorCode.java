package com.ssafy.backend.domain.news.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum NewsErrorCode {
    EXIST_NEWS_SRC_ORIGIN(HttpStatus.INTERNAL_SERVER_ERROR, "이미 등록된 뉴스입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
