package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface OAuthService {
    String provideAuthCodeRequestUrlOAuth(OAuthDomain oAuthDomain);

    MemberLoginResponseRecord loginOAuth(OAuthDomain oAuthDomain, String authCode);
}
