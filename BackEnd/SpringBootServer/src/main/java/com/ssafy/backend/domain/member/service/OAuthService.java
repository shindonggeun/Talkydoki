package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface OAuthService {
    String provideAuthCodeRequestUrlOAuth(OAuthDomain oAuthDomain);

    MemberLoginResponse loginOAuth(OAuthDomain oAuthDomain, String authCode);
}
