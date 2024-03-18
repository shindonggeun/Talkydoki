package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import lombok.Builder;

@Builder
public record MemberInfo(
        Long id,
        String email,
        String name,
        String nickname,
        String profileImage,
        MemberRole role
) {
}
