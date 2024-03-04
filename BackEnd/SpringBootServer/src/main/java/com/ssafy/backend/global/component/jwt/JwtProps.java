package com.ssafy.backend.global.component.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * JWT(Jason Web Token) 설정 값을 관리하는 레코드입니다.
 * 이 레코드는 애플리케이션의 구성 파일({@code application.properties} 또는 {@code application.yml})
 * 에서 정의된 JWT 관련 설정 값을 불러오는 데 사용됩니다. {@link ConfigurationProperties} 애너테이션을 통해
 * 'jwt' 접두사로 시작하는 설정 값을 해당 필드에 자동으로 바인딩합니다.
 * {@code accessKey}는 액세스 토큰을 생성할 때 사용되는 비밀 키를 나타내며,
 * {@code accessExpiration}은 액세스 토큰의 만료 기간을 나타냅니다.
 * {@code refreshKey}는 리프레시 토큰을 생성할 때 사용되는 비밀 키를 나타내며,
 * {@code refreshExpiration}은 리프레시 토큰의 만료 기간을 나타냅니다.
 *
 * @param accessKey 액세스 토큰 생성에 사용되는 비밀 키
 * @param accessExpiration 액세스 토큰의 만료 시간
 * @param refreshKey 리프레시 토큰 생성에 사용되는 비밀 키
 * @param refreshExpiration 리프레시 토큰의 만료 시간
 */
@ConfigurationProperties(prefix = "jwt")
public record JwtProps(
        String accessKey,
        Duration accessExpiration,
        String refreshKey,
        Duration refreshExpiration
) {
}

