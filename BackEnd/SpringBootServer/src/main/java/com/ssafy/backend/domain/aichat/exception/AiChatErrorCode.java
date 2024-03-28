package com.ssafy.backend.domain.aichat.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AiChatErrorCode {
    NOT_FOUND_AI_CHAT_ROOM(HttpStatus.NOT_FOUND, "해당 AI 회화 채팅방을 찾을 수 없습니다."),
    NOT_FOUNT_AI_CHAT_ROOM_SETUP(HttpStatus.NOT_FOUND, "AI 회화 채팅방 세팅을 찾을 수 없습니다."),
    DUPLICATE_CONVERSATION_TOPIC(HttpStatus.BAD_REQUEST, "이전에 대화한 내용과 중복됩니다. 대화를 종료하거나 새로운 내용으로 다시 대화해주세요.");

    private final HttpStatus httpStatus;
    private final String errorMessage;
}
