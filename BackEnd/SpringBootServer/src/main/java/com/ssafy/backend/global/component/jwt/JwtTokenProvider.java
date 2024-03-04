package com.ssafy.backend.global.component.jwt;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.global.component.jwt.exception.JwtErrorCode;
import com.ssafy.backend.global.component.jwt.exception.JwtException;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActiveRecord;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProps jwtProps;

    private static final String CLAIM_EMAIL = "email";
    private static final String CLAIM_NAME = "name";
    private static final String CLAIM_NICKNAME = "nickname";
    private static final String CLAIM_PROFILE_IMAGE = "profileImage";
    private static final String CLAIM_ROLE = "role";

    // 액세스 토큰 발급
    public String issueAccessToken(Member member) {

        Claims claims = Jwts.claims()
                .id(String.valueOf(member.getId()))
                .add(CLAIM_EMAIL, member.getEmail())
                .add(CLAIM_NAME, member.getName())
                .add(CLAIM_NICKNAME, member.getNickname())
                .add(CLAIM_PROFILE_IMAGE, member.getProfileImage())
                .add(CLAIM_ROLE, member.getRole())
                .build();

        return issueToken(claims, jwtProps.accessExpiration(), jwtProps.accessKey());
    }

    // 리프레쉬 토큰 발급
    public String issueRefreshToken() {
        return issueToken(null, jwtProps.refreshExpiration(), jwtProps.refreshKey());
    }

    // 토큰을 회원 정보로 파싱
    public MemberLoginActiveRecord parseAccessToken(String accessToken) {
        Claims payload = parseToken(accessToken, jwtProps.accessKey());

        return MemberLoginActiveRecord.builder()
                .id(Long.valueOf(payload.getId()))
                .email(payload.get(CLAIM_EMAIL, String.class))
                .name(payload.get(CLAIM_NAME, String.class))
                .nickname(payload.get(CLAIM_NICKNAME, String.class))
                .profileImage(payload.get(CLAIM_PROFILE_IMAGE, String.class))
                .role(MemberRole.fromName(payload.get(CLAIM_ROLE, String.class)))
                .build();
    }

    private String issueToken(Claims claims, Duration expiration, String secretKey) {
        Date now = new Date();

        return Jwts.builder()
                .claims(claims)
                .issuedAt(now)
                .expiration(new Date(now.getTime() + expiration.toMillis()))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                .compact();
    }

    private Claims parseToken(String token, String secretKey) {
        Claims payload;

        try {
            payload = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secretKey.getBytes()))
                    .build()
                    .parseSignedClaims(token).getPayload();

        } catch (ExpiredJwtException e) {
            throw new JwtException(JwtErrorCode.EXPIRED_TOKEN);
        } catch (MalformedJwtException | SecurityException | IllegalArgumentException e) {
            throw new JwtException(JwtErrorCode.INVALID_TOKEN);
        }

        return payload;
    }
}
