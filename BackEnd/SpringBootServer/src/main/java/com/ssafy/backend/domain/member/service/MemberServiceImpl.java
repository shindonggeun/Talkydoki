package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberInfoRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.global.component.jwt.service.JwtTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final JwtTokenService jwtTokenService;
    private final PasswordEncoder passwordEncoder;

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

        // TODO: Spring Security 이용하여 비밀번호 검증 로직 필요
        if (!passwordEncoder.matches(loginRequest.password(), realPassword)) {
            throw new MemberException(MemberErrorCode.NOT_MATCH_PASSWORD);
        }

        return jwtTokenService.issueAndSaveTokens(member);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public MemberInfoRecord getMember(Long memberId) {
        // TODO: 회원 관련 커스텀 Exception 처리하기
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new RuntimeException("해당 회원을 찾을 수 없습니다."));

        return MemberInfoRecord.builder() // 회원 정보 반환
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .nickname(member.getNickname())
                .profileImage(member.getProfileImage())
                .role(member.getRole())
                .build();
    }

}
