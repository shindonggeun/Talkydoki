package com.ssafy.backend.global.component.oauth.vendor;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

public interface OAuthMemberClient {
    OAuthDomain getOAuthDomain();

    Member fetch(OAuthDomain oAuthDomain, String authCode);
}
