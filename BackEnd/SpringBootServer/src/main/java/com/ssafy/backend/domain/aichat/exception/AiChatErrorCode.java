package com.ssafy.backend.domain.aichat.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AiChatErrorCode {
    NOT_FOUND_AI_CHAT_ROOM(HttpStatus.NOT_FOUND, "해당 AI 회화 채팅방을 찾을 수 없습니다."),
    NOT_FOUNT_AI_CHAT_ROOM_SETUP(HttpStatus.NOT_FOUND, "AI 회화 채팅방 세팅을 찾을 수 없습니다."),
    DUPLICATE_CONVERSATION_TOPIC(HttpStatus.BAD_REQUEST, "대화가 종료되었습니다. 새로고침해서 다시 시작하거나 레포트를 작성해주세요.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
