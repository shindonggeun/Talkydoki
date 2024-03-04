package com.ssafy.backend.global.component.jwt.security;

import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import lombok.Builder;

@Builder
public record MemberLoginActiveRecord(
        Long id,
        String email,
        String name,
        String nickname,
        String profileImage,
        MemberRole role
) {
}
