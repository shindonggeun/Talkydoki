package com.ssafy.backend.global.component.email.service;

import com.ssafy.backend.global.component.email.repository.EmailRepository;
import com.ssafy.backend.global.exception.GlobalErrorCode;
import com.ssafy.backend.global.exception.GlobalException;
import jakarta.mail.Message;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.Optional;
import java.util.Random;

/**
 * {@link EmailService}의 구현체로, 이메일 인증 코드의 발송과 검증 로직을 처리합니다.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private final EmailRepository emailRepository; // 이메일 인증 코드 저장소
    private final JavaMailSender javaMailSender; // 이메일 발송을 위한 JavaMailSender

    private static final int EXPIRES_MIN = 5; // 인증 코드의 유효 시간(분)

    /**
     * 지정된 이메일 주소로 인증 코드를 비동기적으로 발송합니다.
     *
     * @param toEmail 인증 코드를 받을 이메일 주소입니다.
     */
    @Override
    public Mono<Void> sendEmailCode(String toEmail) {
        // 이메일 주소 유효성 검사
        if (toEmail == null || toEmail.isEmpty() || !toEmail.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return Mono.error(new GlobalException(GlobalErrorCode.INVALID_EMAIL_ADDRESS));
        }

        Mono.fromRunnable(() -> {
            String emailCode = createKey();
            MimeMessage mimeMessage = createMessage(toEmail, emailCode);
            javaMailSender.send(mimeMessage); // 블로킹 호출
            emailRepository.save(toEmail, emailCode, EXPIRES_MIN); // 블로킹 호출
        }).subscribeOn(Schedulers.boundedElastic()).subscribe();

        // 클라이언트에게 즉시 성공 응답을 반환
        return Mono.empty();
    }

    /**
     * 제공된 이메일 주소와 인증 코드를 검증합니다.
     *
     * @param email 검증할 이메일 주소입니다.
     * @param code 사용자로부터 받은 인증 코드입니다.
     * @throws GlobalException 인증 코드가 유효하지 않거나 일치하지 않는 경우 예외를 발생시킵니다.
     */
    @Override
    public void verifyEmailCode(String email, String code) {
        Optional<String> savedCode = emailRepository.findSignupCode(email); // 저장된 인증 코드 조회

        if (savedCode.isEmpty() || !savedCode.get().equals(code)) { // 인증 코드 불일치
            throw new GlobalException(GlobalErrorCode.INVALID_EMAIL_VERIFICATION_CODE);
        }

        emailRepository.deleteSignupCode(email); // 인증 성공 후 인증 코드 삭제
    }

    /**
     * 8자리 인증 코드를 생성하는 내부 메서드입니다.
     *
     * @return 생성된 인증 코드입니다.
     */
    private String createKey() {
        StringBuilder key = new StringBuilder();
        Random rnd = new Random();
        // 인증 코드 구성: 소문자, 대문자, 숫자를 랜덤으로 조합
        int [][] asciiIndex = {{26, 97}, {26, 65}, {10, 48}}; // 소문자, 대문자, 숫자에 해당하는 ASCII 범위

        for(int i = 0; i < 8; i++) { // 8자리 인증 코드 생성
            int[] ascii = asciiIndex[rnd.nextInt(asciiIndex.length)];
            key.append((char)(rnd.nextInt(ascii[0]) + ascii[1]));
        }
        return key.toString();
    }

    /**
     * 이메일 메시지를 생성하는 내부 메서드입니다.
     *
     * @param toEmail 수신자 이메일 주소입니다.
     * @param emailCode 발송할 인증 코드입니다.
     * @return 생성된 MimeMessage 객체입니다.
     */
    private MimeMessage createMessage(String toEmail, String emailCode) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            mimeMessage.addRecipients(Message.RecipientType.TO, toEmail);
            mimeMessage.setSubject("Talkydoki 이메일 인증 코드입니다.");

            // 이메일 본문 구성
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
            return mimeMessage;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
