package com.ssafy.backend.domain.member.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode {
    EXIST_MEMBER_EMAIL(HttpStatus.INTERNAL_SERVER_ERROR, "이미 가입되어 있는 이메일입니다."),
    NOT_FOUND_MEMBER(HttpStatus.NOT_FOUND, "해당 회원을 찾을 수 없습니다."),
    NOT_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    ALREADY_MEMBER_LOGOUT(HttpStatus.BAD_REQUEST, "이미 로그아웃 된 회원입니다."),
    CURRENT_CHANGE_MATCH_PASSWORD(HttpStatus.BAD_REQUEST, "현재 비밀번호가 변경하려는 비밀번호와 같습니다."),
    PASSWORD_CONFIRMATION_MISMATCH(HttpStatus.BAD_REQUEST, "비밀번호 변경과 비밀번호 변경 확인이 같지 않습니다."),
    REDIS_NOT_TOKEN(HttpStatus.UNAUTHORIZED, "로그인 시간이 만료되었습니다. 다시 로그인해주세요.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
