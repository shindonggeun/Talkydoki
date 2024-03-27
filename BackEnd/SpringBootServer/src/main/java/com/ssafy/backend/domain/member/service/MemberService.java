package com.ssafy.backend.domain.member.service;

import com.ssafy.backend.domain.member.dto.*;

/**
 * 회원 관련 서비스 인터페이스 정의.
 */
public interface MemberService {

    /**
     * 회원가입을 처리합니다.
     *
     * @param signupRequest 회원가입 요청 데이터
     */
    void signupMember(MemberSignupRequest signupRequest);

    /**
     * 로그인을 처리하고, 로그인 응답 데이터를 반환합니다.
     *
     * @param loginRequest 로그인 요청 데이터
     * @return 로그인 응답 데이터
     */
    MemberLoginResponse loginMember(MemberLoginRequest loginRequest);

    /**
     * 로그아웃을 처리합니다.
     *
     * @param email 로그아웃할 회원의 이메일
     */
    void logoutMember(String email);

    /**
     * 회원 정보를 조회합니다.
     *
     * @param memberId 회원 ID
     * @return 조회된 회원 정보
     */
    MemberInfo getMember(Long memberId);

    /**
     * 회원 탈퇴를 처리합니다.
     *
     * @param memberId 탈퇴할 회원의 ID
     */
    void deleteMember(Long memberId);

    void updateProfileImageAndNickNameMember(Long memberId, MemberUpdateRequest updateRequest);

    void updatePasswordMember(Long memberId, MemberPasswordChangeRequest passwordChangeRequest);

    /**
     * 마이 페이지 조회에 필요한 정보를 처리합니다.
     *
     * @param memberId 회원 ID
     */
    MemberPage getMyPageData(Long memberId);
}
