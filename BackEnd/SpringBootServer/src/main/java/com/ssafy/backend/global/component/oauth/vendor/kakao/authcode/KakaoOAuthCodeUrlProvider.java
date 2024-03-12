package com.ssafy.backend.global.component.oauth.vendor.kakao.authcode;

import com.ssafy.backend.global.component.oauth.vendor.OAuthCodeUrlProvider;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import com.ssafy.backend.global.component.oauth.vendor.kakao.KakaoOAuthProps;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class KakaoOAuthCodeUrlProvider implements OAuthCodeUrlProvider {
    private final KakaoOAuthProps props;

    @Override
    public OAuthDomain support() {
        return OAuthDomain.KAKAO;
    }

    @Override
    public String provide(OAuthDomain oAuthDomain) {
        return UriComponentsBuilder
                .fromUriString("https://kauth.kakao.com/oauth/authorize")
                .queryParam("response_type","code")
                .queryParam("client_id",props.clientId())
                .queryParam("redirect_uri",props.redirectUri())
                .queryParam("scope",String.join(",",props.scope()))
                .toUriString();
    }
}

