package com.ssafy.backend.global.component.oauth.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record NaverMemberResponse(
        String resultcode,
        String message,
        Response response
) {

    public Member toDomain() {
        return Member.builder()
                .email(response.email)
                .name(response.name)
                .nickname(response.nickname)
                .profileImage(response.profileImage)
                .role(MemberRole.USER)
                .oAuthDomain(OAuthDomain.NAVER)
                .build();
    }


    @JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
    public record Response(
            String id,
            String nickname,
            String name,
            String email,
            String gender,
            String age,
            String birthday,
            String profileImage,
            String birthyear,
            String mobile
    ) {
    }


}
