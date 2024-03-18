package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.jwt.service.JwtTokenService;
import com.ssafy.backend.global.component.oauth.vendor.OAuthCodeUrlProvider;
import com.ssafy.backend.global.component.oauth.vendor.OAuthMemberClient;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final OAuthCodeUrlProvider oAuthCodeUrlProvider;
    private final OAuthMemberClient oAuthMemberClient;
    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;

    @Transactional(readOnly = true)
    @Override
    public String provideAuthCodeRequestUrlOAuth(OAuthDomain oAuthDomain) {
        return oAuthCodeUrlProvider.provide(oAuthDomain);
    }

    @Override
    public MemberLoginResponse loginOAuth(OAuthDomain oAuthDomain, String authCode) {
        Member oauthMember = oAuthMemberClient.fetch(oAuthDomain, authCode);
        Member member = memberRepository.findByEmail(oauthMember.getEmail()).orElseGet(()
                -> memberRepository.save(oauthMember));

        return jwtTokenService.issueAndSaveTokens(member);
    }
}
