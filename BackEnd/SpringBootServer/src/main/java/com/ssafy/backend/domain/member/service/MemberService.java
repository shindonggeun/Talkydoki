package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.MemberInfoRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
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

    /**
     * 로그인을 처리하고, 로그인 응답 데이터를 반환합니다.
     *
     * @param loginRequest 로그인 요청 데이터
     * @return 로그인 응답 데이터
     */
    MemberLoginResponseRecord loginMember(MemberLoginRequestRecord loginRequest);

    /**
     * 회원 정보를 조회합니다.
     *
     * @param memberId 회원 ID
     * @return 조회된 회원 정보
     */
    MemberInfoRecord getMember(Long memberId);
}
