package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import lombok.Builder;

@Builder
public record MemberInfo(
        Long id,
        String email,
        String name,
        String nickname,
        String profileImage,
        OAuthDomain provider,
        MemberRole role
) {
}
