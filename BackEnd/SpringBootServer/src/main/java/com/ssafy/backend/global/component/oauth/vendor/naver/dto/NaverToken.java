package com.ssafy.backend.global.component.oauth.vendor.naver.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record NaverToken(
        String tokenType,
        String accessToken,
        String idToken,
        String expiresIn,
        String refreshToken,
        String refreshTokenExpiresIn,
        String scope
) {

}
