package com.ssafy.backend.global.component.oauth.vendor.enums;

/**
 * 소셜 로그인 제공자를 나타내는 열거형입니다.
 * KAKAO, NAVER, GOOGLE 등을 정의하고 있으며, 각 소셜 서비스 제공자를 식별하는 데 사용됩니다.
 */
public enum OAuthDomain {
    KAKAO, NAVER, GOOGLE;

    /**
     * 주어진 문자열 이름으로부터 OAuthDomain 열거형을 얻습니다.
     * 일치하는 이름이 없는 경우 IllegalArgumentException이 발생합니다.
     *
     * @param providerName 변환할 제공자의 이름
     * @return 해당 이름에 맞는 OAuthDomain 열거형
     */
    public static OAuthDomain fromName(String providerName) {
        return OAuthDomain.valueOf(providerName.toUpperCase()); // 이름을 열거형으로 변환
    }
}
