package com.ssafy.backend.global.component.oauth.vendor.google.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GoogleMemberResponse(
        String familyName,  // 성
        String name,    // 이름 (표시 이름, 즉 성 + 이름)
        String picture,
        String locale,
        String email,
        String givenName,   // 이름 (성 빼고)
        String id,
        boolean verifiedEmail
) {

    public Member toDomain() {
        return Member.builder()
                .email(email)
                .name(name)
                .nickname(givenName)
                .profileImage(picture)
                .role(MemberRole.USER)
                .oAuthDomain(OAuthDomain.GOOGLE)
                .build();
    }

}
