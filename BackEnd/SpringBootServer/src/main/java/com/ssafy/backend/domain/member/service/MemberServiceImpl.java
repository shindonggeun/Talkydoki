package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberInfoRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.jwt.repository.RefreshTokenRepository;
import com.ssafy.backend.global.component.jwt.service.JwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void signupMember(MemberSignupRequestDto signupRequest) {
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new MemberException(MemberErrorCode.EXIST_MEMBER_EMAIL);
        }

        signupRequest.setPassword(passwordEncoder.encode(signupRequest.getPassword()));

        memberRepository.save(signupRequest.toEntity());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MemberLoginResponseRecord loginMember(MemberLoginRequestRecord loginRequest) {
        Member member = memberRepository.findByEmail(loginRequest.email()).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        String realPassword = member.getPassword();

        if (!passwordEncoder.matches(loginRequest.password(), realPassword)) {
            throw new MemberException(MemberErrorCode.NOT_MATCH_PASSWORD);
        }

        return jwtTokenService.issueAndSaveTokens(member);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void logoutMember(String email) {
        Optional<String> token = refreshTokenRepository.find(email);
        // TODO: 이미 로그아웃 한 회원 커스텀 Exception 처리
        if (token.isEmpty()) {
            throw new RuntimeException("이미 로그아웃 된 회원입니다.");
        }

        refreshTokenRepository.delete(email); // 리프레쉬 토큰 삭제
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = true)
    public MemberInfoRecord getMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        return MemberInfoRecord.builder() // 회원 정보 반환
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .profileImage(member.getProfileImage())
                .role(member.getRole())
                .build();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
    }

}
