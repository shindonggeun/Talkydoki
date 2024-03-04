package com.ssafy.backend.global.component.jwt.security;

import lombok.Getter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * JWT 인증을 위한 AuthenticationToken 구현체입니다.
 * 이 클래스는 사용자의 인증 정보를 담고 있으며, Spring Security의 인증 과정에서 사용됩니다.
 */
@Getter
public class JwtAuthenticationToken extends AbstractAuthenticationToken {
    private final MemberLoginActiveRecord principal;
    private final Object credentials;

    /**
     * JwtAuthenticationToken 생성자.
     *
     * @param principal 사용자의 주요 인증 정보를 나타내는 MemberLoginActiveRecord 객체입니다. 여기에는 사용자의 ID, 이메일 등이 포함될 수 있습니다.
     * @param credentials 인증 과정에서 사용된 자격 증명 정보입니다. 일반적으로 비밀번호나, JWT 토큰 등이 될 수 있습니다.
     * @param authorities 사용자에게 부여된 권한 목록입니다. 이는 Spring Security에서 사용자의 권한을 확인하는 데 사용됩니다.
     */
    public JwtAuthenticationToken(MemberLoginActiveRecord principal, Object credentials, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.principal = principal;
        this.credentials = credentials;
        // 인증이 완료된 것으로 처리합니다. 이 부분은 인증 과정에서 반드시 검증이 필요합니다.
        super.setAuthenticated(true); // 고려사항: 인증 상태를 외부에서 설정할 수 있도록 변경
    }

    /**
     * 인증 과정에서 사용된 자격 증명 정보를 반환합니다.
     *
     * @return 인증에 사용된 자격 증명 정보.
     */
    @Override
    public Object getCredentials() {
        return this.credentials;
    }

    /**
     * 사용자의 주요 인증 정보를 반환합니다.
     *
     * @return 사용자의 주요 인증 정보를 담고 있는 MemberLoginActiveRecord 객체.
     */
    @Override
    public Object getPrincipal() {
        return this.principal;
    }
}
