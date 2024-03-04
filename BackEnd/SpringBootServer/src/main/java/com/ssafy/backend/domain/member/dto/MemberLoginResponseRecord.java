package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.global.component.jwt.dto.TokenRecord;
import lombok.Builder;

@Builder
public record MemberLoginResponseRecord(TokenRecord token, MemberInfoRecord memberInfo) {
}
