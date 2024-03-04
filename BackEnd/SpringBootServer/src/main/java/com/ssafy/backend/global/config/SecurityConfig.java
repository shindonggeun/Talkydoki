package com.ssafy.backend.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.global.component.jwt.JwtTokenProvider;
import com.ssafy.backend.global.component.jwt.security.JwtSecurityFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Spring Security 설정을 담당하는 클래스입니다.
 * {@link EnableMethodSecurity} 어노테이션을 통해 메소드 단위의 보안 설정을 활성화합니다.
 */

@Configuration
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final ObjectMapper objectMapper;

    /**
     * Spring Security의 HTTP 보안 설정을 구성합니다.
     *
     * @param http HttpSecurity
     * @return 구성된 SecurityFilterChain
     * @throws Exception 보안 구성 중 발생 가능한 예외
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // CORS 설정
        http.cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )
                .httpBasic(AbstractHttpConfigurer::disable) // HTTP 기본 인증 비활성화
                .headers(header ->
                        header.frameOptions(
                                HeadersConfigurer.FrameOptionsConfig::disable // 프레임 옵션 비활성화
                        )
                )
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll()   // 모든 요청에 대해 접근 허용
                )
                .formLogin(AbstractHttpConfigurer::disable) // Spring security 자체 제공 로그인 폼 비활성화
                .logout(AbstractHttpConfigurer::disable)    // Spring security 자체 제공 로그아웃 비활성화
                .addFilterBefore(jwtSecurityFilter(), UsernamePasswordAuthenticationFilter.class);  // JWT 필터 추가

        return http.build();
    }

    /**
     * WebSecurityCustomizer를 통해 웹 보안을 커스터마이징합니다.
     *
     * @return 구성된 WebSecurityCustomizer
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().anyRequest();    // 모든 요청에 대해 보안 검사 무시
    }

    /**
     * JWT 토큰을 처리하기 위한 필터를 생성합니다.
     *
     * @return JwtSecurityFilter
     */
    @Bean
    public JwtSecurityFilter jwtSecurityFilter() {
        return new JwtSecurityFilter(jwtTokenProvider, objectMapper);
    }

    /**
     * CORS(Cross-Origin Resource Sharing) 설정을 위한 CorsConfigurationSource 객체를 제공합니다.
     * 이 설정을 통해 다양한 출처의 요청을 안전하게 처리할 수 있게 하며, 웹 애플리케이션의 접근성을 높일 수 있습니다.
     *
     * @return CORS 구성을 위한 CorsConfigurationSource 객체
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = getCorsConfiguration(3600L);
        // CORS 구성을 URL 패턴에 매핑합니다. 이 예에서는 애플리케이션의 모든 경로("/**")에 대해 CORS 구성을 적용합니다.
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    /**
     * CORS 필터를 스프링 부트 애플리케이션의 필터 체인에 등록합니다.
     * 이를 통해 모든 들어오는 요청에 대해 CORS 정책이 적용되도록 합니다.
     *
     * @return FilterRegistrationBean 객체로, 스프링 부트가 관리하는 필터 체인에 CORS 필터를 등록하기 위해 사용됩니다.
     */
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
        CorsConfiguration config = getCorsConfiguration(6000L);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // 애플리케이션의 모든 경로("/**")에 대해 CORS 구성을 적용합니다.
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(
                new CorsFilter(source));
        // 필터 체인에서의 실행 순서를 설정합니다. 숫자가 낮을수록 먼저 실행됩니다.
        filterBean.setOrder(0); // 필터 체인에서의 순서 설정
        return filterBean;
    }

    /**
     * CORS 정책 구성을 위한 CorsConfiguration 객체를 생성하고 구성합니다.
     * 이 메서드는 애플리케이션의 CORS 정책을 중앙에서 관리할 수 있게 해주며,
     * 필요에 따라 다양한 설정을 적용할 수 있는 유연성을 제공합니다.
     *
     * @param maxAge 프리플라이트 요청의 최대 캐시 시간(초). 이 값은 브라우저가 사전 요청의 결과를 캐시하는 시간을 결정합니다.
     * @return 구성된 CorsConfiguration 객체
     */
    private static CorsConfiguration getCorsConfiguration(long maxAge) {
        CorsConfiguration config = new CorsConfiguration();
        // 크레덴셜(인증 정보)을 포함한 요청을 허용합니다. 쿠키나 HTTP 인증 헤더 등의 사용을 가능하게 합니다.
        // 사용자 인증을 필요로 하는 리소스에 대한 접근을 가능하게 합니다.
        config.setAllowCredentials(true);
        // 모든 출처에서 오는 요청을 허용합니다. 구체적인 출처를 지정하는 것이 권장됩니다.
        config.addAllowedOriginPattern("*");
        // 모든 요청 헤더를 허용합니다. 클라이언트가 요청에 다양한 종류의 헤더를 포함시킬 수 있습니다.
        config.addAllowedHeader("*");
        // 모든 HTTP 메서드를 허용합니다. 이를 통해 RESTful API 지원이 강화됩니다.
        config.addAllowedMethod("*");
        // 프리플라이트 요청의 응답을 캐시할 시간(초)을 설정합니다. 이는 네트워크 지연을 줄이고 성능을 향상시킵니다.
        config.setMaxAge(maxAge);
        return config;
    }

    /**
     * 비밀번호 암호화를 위한 PasswordEncoder 빈을 생성합니다.
     *
     * @return PasswordEncoder
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt 알고리즘을 사용한 패스워드 암호화 객체 생성
        return new BCryptPasswordEncoder();
    }

}
