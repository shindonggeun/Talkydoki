package com.ssafy.backend.domain.news.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum NewsErrorCode {
    NOT_FOUND_NEWS(HttpStatus.NOT_FOUND, "뉴스 데이터가 없습니다."),
    EXIST_NEWS_SRC_ORIGIN(HttpStatus.INTERNAL_SERVER_ERROR, "이미 등록된 뉴스입니다."),
    EXIST_NEWS_IMAGE(HttpStatus.INTERNAL_SERVER_ERROR, "이미 존재하는 이미지입니다.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
