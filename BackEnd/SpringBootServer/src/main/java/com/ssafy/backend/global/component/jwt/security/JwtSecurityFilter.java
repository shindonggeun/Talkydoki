package com.ssafy.backend.global.component.jwt.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.exception.JwtErrorCode;
import com.ssafy.backend.global.component.jwt.exception.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * JWT 인증을 위한 커스텀 필터입니다.
 * HTTP 요청의 Authorization 헤더에서 JWT 액세스 토큰을 추출하고 검증하여,
 * 유효한 경우 Spring Security의 SecurityContext에 인증 정보를 설정합니다.
 */
@Slf4j
@RequiredArgsConstructor
public class JwtSecurityFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;
    private static final String BEARER_PREFIX = "Bearer ";

    /**
     * 요청에 대해 필터링 로직을 수행합니다.
     *
     * @param request     HTTP 요청 객체
     * @param response    HTTP 응답 객체
     * @param filterChain 필터 체인
     * @throws ServletException 서블릿 예외 발생 시
     * @throws IOException      입출력 예외 발생 시
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String accessToken = getJwtFrom(request);

        if (StringUtils.hasText(accessToken)) {
            try {
                MemberLoginActive member = jwtTokenProvider.parseAccessToken(accessToken);

                // 로그를 통해 인증된 회원의 ID와 요청 시도를 기록합니다.
                log.info("회원 ID : {}  - 요청 시도", member.id());
                SecurityContextHolder.getContext().setAuthentication(createAuthenticationToken(member));
            } catch (JwtException e) {
                if (e.getErrorCode() == JwtErrorCode.EXPIRED_TOKEN) {
                    try {
                        String email = jwtTokenProvider.getEmailFromExpiredAccessToken(accessToken);
                        // 이메일을 이용하여 redis에 refreshToken 저장됐는지 확인 후 재발급 처리
                        String reissueAccessToken = jwtTokenProvider.reissueAccessToken(email);
                        // 재발급 된 accessToken을 이용하여 현재 로그인 활성화된 회원정보 가져오기
                        MemberLoginActive member = jwtTokenProvider.parseAccessToken(reissueAccessToken);

                        // 로그를 통해 인증된 회원의 ID와 요청 시도를 기록합니다.
                        log.info("회원 ID : {}  - 요청 시도", member.id());
                        SecurityContextHolder.getContext().setAuthentication(createAuthenticationToken(member));

                        // 쿠키에 accessToken 저장하는 메서드 부르기
                        addNewAccessTokenToResponse(response, reissueAccessToken);
                    } catch (JwtException ex) {
                        SecurityContextHolder.clearContext();
                        sendError(response, ex);
                    }
                } else {
                    SecurityContextHolder.clearContext();
                    sendError(response, e);
                    return;
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    /**
     * 요청 헤더에서 JWT 토큰을 추출합니다.
     *
     * @param request HTTP 요청 객체
     * @return 추출된 JWT 토큰 문자열. 추출할 수 없는 경우 null 반환.
     */
    private String getJwtFrom(HttpServletRequest request) {
        String bearerToken = request.getHeader(HttpHeaders.AUTHORIZATION);

        // 요청 URI와 함께 추출된 액세스 토큰 값을 로깅합니다.
        log.info("요청 : {} / 액세스 토큰 값 : {}", request.getRequestURI(), bearerToken);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }

        return null;
    }

    /**
     * 주어진 사용자 정보를 기반으로 JwtAuthenticationToken을 생성합니다.
     *
     * @param member 사용자 정보
     * @return 생성된 JwtAuthenticationToken 객체
     */
    private JwtAuthenticationToken createAuthenticationToken(MemberLoginActive member) {
        return new JwtAuthenticationToken(member, "",
                List.of(new SimpleGrantedAuthority(member.role().name())));
    }

    /**
     * JWT 예외 발생 시 클라이언트에게 오류 응답을 보냅니다.
     *
     * @param response HTTP 응답 객체
     * @param e        발생한 JwtException
     * @throws IOException 입출력 예외 발생 시
     */
    private void sendError(HttpServletResponse response, JwtException e) throws IOException {
        response.setStatus(e.getErrorCode().getHttpStatus().value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");

        PrintWriter writer = response.getWriter();
        writer.write(objectMapper.writeValueAsString(Message.fail(e.getErrorCode().name(), e.getMessage())));
        writer.flush();
    }

    private void addNewAccessTokenToResponse(HttpServletResponse response, String accessToken) {
        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600);
        response.addCookie(accessTokenCookie);
    }
}
