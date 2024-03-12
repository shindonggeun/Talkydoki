package com.ssafy.backend.domain.member.exception;

import com.ssafy.backend.global.common.dto.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@Slf4j
@RestControllerAdvice
public class MemberExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Message<Void>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        StringBuilder errorMessageBuilder = new StringBuilder();

        // 오류 메시지를 순서대로 추가합니다.
        ex.getBindingResult().getAllErrors().forEach(error -> {
            if (!errorMessageBuilder.isEmpty()) {
                errorMessageBuilder.append(", ");
            }
//            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errorMessageBuilder.append(message);
        });

        // 첫 번째 오류 메시지를 resultMessage에 포함
        String resultMessage = errorMessageBuilder.toString();

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Message.fail(null, resultMessage));
    }


    @ExceptionHandler(MemberException.class)
    public ResponseEntity<Message<Void>> memberException(MemberException e) {
        log.error("회원 관련 오류: {}", e.getMessage());
        return ResponseEntity.status(e.getErrorCode().getHttpStatus()).body(Message.fail(null, e.getErrorCode().getErrorMessage()));
    }
}
