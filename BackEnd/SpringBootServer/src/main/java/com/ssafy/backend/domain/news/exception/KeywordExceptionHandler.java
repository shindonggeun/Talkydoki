package com.ssafy.backend.domain.news.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class KeywordExceptionHandler {

    @ExceptionHandler(KeywordException.class)
    public ResponseEntity<Message<Void>> keywordException(KeywordException e) {
        log.error("키워드 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getErrorCode().getErrorMessage()));
    }
}
