package com.ssafy.backend.global.component.email.controller;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.email.service.EmailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "이메일", description = "이메일 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/email")
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/send/{memberEmail}")
    public ResponseEntity<Message<Void>> sendEmailCode(@PathVariable String memberEmail) {
        emailService.sendEmailCode(memberEmail);
        return ResponseEntity.ok().body(Message.success());
    }

    @PostMapping("/verify/{memberEmail}/{emailCode}")
    public ResponseEntity<Message<Void>> verifyEmailCode(@PathVariable String memberEmail, @PathVariable String emailCode) {
        emailService.verifyEmailCode(memberEmail, emailCode);
        return ResponseEntity.ok().body(Message.success());
    }
}
