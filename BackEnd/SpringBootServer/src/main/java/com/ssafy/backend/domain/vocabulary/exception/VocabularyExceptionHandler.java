package com.ssafy.backend.domain.vocabulary.exception;

import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class VocabularyExceptionHandler {
    @ExceptionHandler(VocabularyException.class)
    public ResponseEntity<Message<Void>> vocabularyException(VocabularyException e) {
        log.error("단어장 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getErrorCode().getErrorMessage()));
    }
}
