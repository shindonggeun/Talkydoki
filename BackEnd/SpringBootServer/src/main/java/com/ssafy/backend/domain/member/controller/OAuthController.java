package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.service.OAuthService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
public class OAuthController {
    private final OAuthService oAuthService;

    @GetMapping("/{oAuthDomain}")
    public ResponseEntity<Message<String>> provideAuthCodeRequestUrlOAuth(@PathVariable OAuthDomain oAuthDomain) {
        String redirectUrl = oAuthService.provideAuthCodeRequestUrlOAuth(oAuthDomain);
        return ResponseEntity.ok().body(Message.success(redirectUrl));
    }

    @GetMapping("/{oAuthDomain}/login")
    public ResponseEntity<Message<MemberLoginResponseRecord>> loginOAuth(@PathVariable("oAuthDomain") OAuthDomain oAuthDomain,
                                                                         @RequestParam("code") String authCode,
                                                                         HttpServletResponse response) {
        MemberLoginResponseRecord loginResponse = oAuthService.loginOAuth(oAuthDomain, authCode);
        // JWT 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", loginResponse.token().accessToken());
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600); // 60분(3600초)으로 설정
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success(loginResponse));
    }

}
