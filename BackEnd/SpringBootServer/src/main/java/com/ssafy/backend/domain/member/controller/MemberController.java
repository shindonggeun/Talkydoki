package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.*;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "회원", description = "회원 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;

    @Operation(
            summary = "회원가입",
            description = "회원정보에 필요한 정보를 입력하여 회원가입을 하는 기능입니다."
    )
    @PostMapping("/signup")
    public ResponseEntity<Message<Void>> signupMember(@Valid @RequestBody MemberSignupRequest signupRequest) {
        memberService.signupMember(signupRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호를 입력하여 로그인을 하는 기능입니다."
    )
    @PostMapping("/login")
    public ResponseEntity<Message<MemberLoginResponse>> loginMember(@RequestBody MemberLoginRequest loginRequest,
                                                                    HttpServletResponse response) {
        MemberLoginResponse loginResponse = memberService.loginMember(loginRequest);
        // JWT 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", loginResponse.jwtToken().accessToken());
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600); // 60분(3600초)으로 설정 (3600)
        response.addCookie(accessTokenCookie);
        return ResponseEntity.ok().body(Message.success(loginResponse));
    }

    @Operation(
            summary = "로그아웃",
            description = "로그인 한 회원을 로그아웃을 하는 기능입니다."
    )
    @PostMapping("/logout")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> logoutMember(@AuthenticationPrincipal MemberLoginActive loginActive) {
        memberService.logoutMember(loginActive.email());;
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "회원정보 불러오기",
            description = "비밀번호를 제외한 회원가입때 입력한 정보를 불러오는 기능입니다."
    )
    @GetMapping("/get")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<MemberInfo>> getMember(@AuthenticationPrincipal MemberLoginActive loginActive) {
        MemberInfo info = memberService.getMember(loginActive.id());
        return ResponseEntity.ok().body(Message.success(info));
    }

    @Operation(
            summary = "회원 탈퇴하기",
            description = "해당 서비스에 가입한 회원의 회원정보를 삭제하는 기능입니다."
    )
    @DeleteMapping("/delete")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> deleteMember(@AuthenticationPrincipal MemberLoginActive loginActive) {
        memberService.deleteMember(loginActive.id());
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "회원 수정하기",
            description = "회원 정보를 수정(닉네임, 프로필 이미지)하는 기능입니다."
    )
    @PatchMapping("/update")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> updateImageAndNicknameMember(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                      @RequestBody MemberUpdateRequest updateRequest) {
        memberService.updateProfileImageAndNickNameMember(loginActive.id(), updateRequest);
        return ResponseEntity.ok().body(Message.success());
    }

}
