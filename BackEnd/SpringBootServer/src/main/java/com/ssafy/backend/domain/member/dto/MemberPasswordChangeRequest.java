package com.ssafy.backend.domain.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record MemberPasswordChangeRequest(
        @NotBlank(message = "비밀번호는 필수 입력값입니다")
        String nowPassword,

        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,16}$", message = "변경하려는 비밀번호 8~16자리수여야 합니다. 영문 대소문자, 숫자, 특수문자를 1개 이상 포함해야 합니다.")
        String changePassword,

        @NotBlank(message = "변경 비밀번호 확인은 필수 입력값입니다")
        String changePasswordCheck
) {
}
