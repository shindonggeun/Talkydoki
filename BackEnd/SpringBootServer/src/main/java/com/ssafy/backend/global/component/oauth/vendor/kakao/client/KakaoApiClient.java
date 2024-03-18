package com.ssafy.backend.global.component.oauth.vendor.kakao.client;

import com.ssafy.backend.global.component.oauth.vendor.kakao.dto.KakaoMemberResponse;
import com.ssafy.backend.global.component.oauth.vendor.kakao.dto.KakaoToken;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.PostExchange;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

public interface KakaoApiClient {
    // 인증 코드 발송 후, 액세스 토큰 받아오기
    @PostExchange(url = "https://kauth.kakao.com/oauth/token", contentType = APPLICATION_FORM_URLENCODED_VALUE)
    KakaoToken fetchToken(@RequestParam(value = "params") MultiValueMap<String, String> params);

    // 액세스 토큰으로 회원 정보 받아오기
    @GetExchange("https://kapi.kakao.com/v2/user/me")
    KakaoMemberResponse fetchMember(@RequestHeader(name = AUTHORIZATION) String bearerToken);
}
