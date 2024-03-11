package com.ssafy.backend.domain.member.controller;

import com.ssafy.backend.domain.member.dto.MemberInfoRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginRequestRecord;
import com.ssafy.backend.domain.member.dto.MemberLoginResponseRecord;
import com.ssafy.backend.domain.member.dto.MemberSignupRequestDto;
import com.ssafy.backend.domain.member.service.MemberService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActiveRecord;
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
    public ResponseEntity<Message<Void>> signupMember(@Valid @RequestBody MemberSignupRequestDto signupRequest) {
        memberService.signupMember(signupRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호를 입력하여 로그인을 하는 기능입니다."
    )
    @PostMapping("/login")
    public ResponseEntity<Message<MemberLoginResponseRecord>> loginMember(@RequestBody MemberLoginRequestRecord loginRequest,
                                                                          HttpServletResponse response) {
        MemberLoginResponseRecord loginResponse = memberService.loginMember(loginRequest);
        // JWT 토큰을 쿠키에 저장
        Cookie accessTokenCookie = new Cookie("accessToken", loginResponse.token().accessToken());
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
    public ResponseEntity<Message<Void>> logoutMember(@AuthenticationPrincipal MemberLoginActiveRecord loginActive) {
        memberService.logoutMember(loginActive.email());;
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "회원정보 불러오기",
            description = "비밀번호를 제외한 회원가입때 입력한 정보를 불러오는 기능입니다."
    )
    @GetMapping("/get")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<MemberInfoRecord>> getMember(@AuthenticationPrincipal MemberLoginActiveRecord loginActive) {
        MemberInfoRecord info = memberService.getMember(loginActive.id());
        return ResponseEntity.ok().body(Message.success(info));
    }
}
