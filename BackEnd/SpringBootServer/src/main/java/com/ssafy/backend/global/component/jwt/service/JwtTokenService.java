package com.ssafy.backend.global.component.jwt.service;

import com.ssafy.backend.domain.member.dto.MemberLoginResponse;
import com.ssafy.backend.domain.member.entity.Member;

public interface JwtTokenService {
    MemberLoginResponse issueAndSaveTokens(Member member);
}
