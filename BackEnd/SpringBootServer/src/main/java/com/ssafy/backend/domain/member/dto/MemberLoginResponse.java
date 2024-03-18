package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.global.component.jwt.dto.JwtToken;
import lombok.Builder;

@Builder
public record MemberLoginResponse(JwtToken jwtToken, MemberInfo memberInfo) {
}
