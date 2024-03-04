package com.ssafy.backend.global.component.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum JwtErrorCode {
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "사용할 수 없는 토큰입니다."),
    SIGNATURE_INVALID(HttpStatus.UNAUTHORIZED, "토큰의 서명 검증에 실패하였습니다.");

    private final HttpStatus httpStatus; // 에러 상황에 해당하는 HTTP 상태 코드
    private final String errorMessage; // 에러 상황을 설명하는 메시지
}

