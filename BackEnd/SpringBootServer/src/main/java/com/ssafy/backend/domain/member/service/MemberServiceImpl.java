package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    @Override
    public void signupMember(MemberSignupRequestDto signupRequest) {
        // TODO: Member 관련 Custom Exception 처리하기
        if (memberRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }

        // TODO: Spring security 이용해서 비밀번호 암호화 처리하기

        memberRepository.save(signupRequest.toEntity());
    }
}
