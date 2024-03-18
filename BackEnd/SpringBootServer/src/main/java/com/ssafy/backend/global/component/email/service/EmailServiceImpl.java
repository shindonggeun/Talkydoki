package com.ssafy.backend.global.component.email.service;

import com.ssafy.backend.global.component.email.repository.EmailRepository;
import com.ssafy.backend.global.exception.GlobalErrorCode;
import com.ssafy.backend.global.exception.GlobalException;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final EmailRepository emailRepository;

    private final JavaMailSender javaMailSender;

    private static final int EXPIRES_MIN = 5;	// 인증코드 인증 제한시간 5분


    @Override
    @Async("threadPoolTaskExecutor") // threadPoolTaskExecutor를 사용하여 비동기 처리
    public void sendEmailCode(String toEmail) {
        String emailCode = createKey();
        MimeMessage mimeMessage = createMessage(toEmail, emailCode);
        javaMailSender.send(mimeMessage);
        emailRepository.save(toEmail, emailCode, EXPIRES_MIN);
    }

    @Override
    public void verifyEmailCode(String email, String code) {
        Optional<String> saveCode = emailRepository.findSignupCode(email);

        if (saveCode.isEmpty() || !saveCode.get().equals(code)) {
            throw new GlobalException(GlobalErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }

        emailRepository.deleteSignupCode(email);
    }

    private String createKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();

        // 인증코드 8자리로
        for (int i = 0; i < 8; i++) {
            int index = rnd.nextInt(3); // 0 ~ 2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    break;
            }
        }
        return key.toString();
    }

    private MimeMessage createMessage(String toEmail, String emailCode) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            mimeMessage.addRecipients(Message.RecipientType.TO, toEmail);
            mimeMessage.setSubject("Talkydoki 이메일 인증 코드입니다.");

            String msgg = "";

            msgg += "<div style='margin:20px;'>";
            msgg += "<h1> Talkydoki 회원가입 이메일 인증번호</h1>";
            msgg += "<br>";
            msgg += "<p>아래 코드를 복사해 입력해주세요.<p>";
            msgg += "<br>";
            msgg += "<p>감사합니다.<p>";
            msgg += "<br>";
            msgg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
            msgg += "<h3 style='color:blue;'>회원가입 메일 인증 코드입니다.</h3>";
            msgg += "<div style='font-size:130%'>";
            msgg += "CODE : <strong>";
            msgg += emailCode + "</strong><div><br/> ";
            msgg += "</div>";

            mimeMessage.setText(msgg, "utf-8", "html"); // 안에 들어갈 내용 세팅
            mimeMessage.setFrom(new InternetAddress("ssafy@gmail.com", "Talkydoki"));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return mimeMessage;
    }
}
