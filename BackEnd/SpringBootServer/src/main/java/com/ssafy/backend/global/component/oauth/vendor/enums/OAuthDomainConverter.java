package com.ssafy.backend.global.component.oauth.vendor.enums;

import org.springframework.core.convert.converter.Converter;

/**
 * 문자열을 OAuthDomain 열거형으로 변환하는 Converter 구현체입니다.
 * 주로 Web 설정에서 사용되며, 요청 파라미터를 열거형으로 바인딩할 때 사용됩니다.
 */
public class OAuthDomainConverter implements Converter<String, OAuthDomain> {
    /**
     * 주어진 문자열을 OAuthDomain 열거형으로 변환합니다.
     *
     * @param source 변환할 문자열
     * @return 변환된 OAuthDomain 열거형
     */
    @Override
    public OAuthDomain convert(String source) {
        return OAuthDomain.fromName(source); // 문자열을 열거형으로 변환
    }
}
