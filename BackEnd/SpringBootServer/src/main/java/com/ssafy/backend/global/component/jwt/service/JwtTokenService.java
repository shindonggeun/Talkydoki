package com.ssafy.backend.global.component.jwt.service;

import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.entity.Member;

public interface JwtTokenService {
    MemberLoginResponseRecord issueAndSaveTokens(Member member);
}
