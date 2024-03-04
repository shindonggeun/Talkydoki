package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;

/**
 * 회원 관련 서비스 인터페이스 정의.
 */
public interface MemberService {

    /**
     * 회원가입을 처리합니다.
     *
     * @param signupRequest 회원가입 요청 데이터
     */
    void signupMember(MemberSignupRequestDto signupRequest);
}
