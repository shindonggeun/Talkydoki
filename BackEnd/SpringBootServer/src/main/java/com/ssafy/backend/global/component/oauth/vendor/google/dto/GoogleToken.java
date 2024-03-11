package com.ssafy.backend.global.component.oauth.vendor.google.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GoogleToken(
        String accessToken,
        String expiresIn,
        String refreshToken,
        String scope,
        String tokenType
) {

}
