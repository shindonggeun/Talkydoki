package com.ssafy.backend.global.component.jwt.service;

import com.ssafy.backend.domain.member.dto.MemberInfoRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.dto.TokenRecord;
import com.ssafy.backend.global.component.jwt.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenServiceImpl implements JwtTokenService {

    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public MemberLoginResponseRecord issueAndSaveTokens(Member member) {
        String accessToken = jwtTokenProvider.issueAccessToken(member);
        String refreshToken = jwtTokenProvider.issueRefreshToken();
        log.info("== {} 회원에 대한 토큰 발급: {}", member.getEmail(), accessToken);

        try {
            refreshTokenRepository.save(member.getEmail(), refreshToken); // 리프레쉬 토큰 저장
        } catch (Exception e) {
            // TODO: Redis 관련 커스텀 Exception 처리
            throw new RuntimeException("Redis 연결에 실패했습니다.");
        }

        TokenRecord token = new TokenRecord(accessToken);
        MemberInfoRecord memberInfo = MemberInfoRecord.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .profileImage(member.getProfileImage())
                .role(member.getRole())
                .build();

        return new MemberLoginResponseRecord(token, memberInfo); // 로그인 응답 데이터 반환
    }
}
