package com.ssafy.backend.global.config;

import com.ssafy.backend.global.component.oauth.vendor.google.client.GoogleApiClient;
import com.ssafy.backend.global.component.oauth.vendor.kakao.client.KakaoApiClient;
import com.ssafy.backend.global.component.oauth.vendor.naver.client.NaverApiClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.support.WebClientAdapter;
import org.springframework.web.service.invoker.HttpServiceProxyFactory;

/**
 * HTTP 통신을 위한 인터페이스 설정을 구성하는 클래스입니다.
 * 카카오와 네이버 API 클라이언트에 대한 빈을 생성합니다.
 */
@Configuration
public class HttpInterfaceConfig {

    /**
     * 카카오 API 클라이언트를 위한 빈을 생성합니다.
     *
     * @return 카카오 API를 사용하기 위한 프록시 인터페이스
     */
    @Bean
    public KakaoApiClient kakaoApiClient() {
        return createHttpInterface(KakaoApiClient.class);
    }

    /**
     * 네이버 API 클라이언트를 위한 빈을 생성합니다.
     *
     * @return 네이버 API를 사용하기 위한 프록시 인터페이스
     */
    @Bean
    public NaverApiClient naverApiClient() {
        return createHttpInterface(NaverApiClient.class);
    }

    /**
     * 구글 API 클라이언트를 위한 빈을 생성합니다.
     *
     * @return 구글 API를 사용하기 위한 프록시 인터페이스
     */
    @Bean
    public GoogleApiClient googleApiClient() {
        return createHttpInterface(GoogleApiClient.class);
    }

    /**
     * 지정된 HTTP 인터페이스 클래스에 대한 프록시 클라이언트를 생성합니다.
     * WebClient 인스턴스는 모든 HTTP 인터페이스에 대해 공유됩니다.
     *
     * @param <T> 프록시를 생성할 인터페이스 타입
     * @param serviceClass 프록시를 생성할 인터페이스 클래스 객체
     * @return 설정된 프록시 인터페이스
     */
    private <T> T createHttpInterface(Class<T> serviceClass) {
        WebClient client = WebClient.builder().build();
        HttpServiceProxyFactory factory = HttpServiceProxyFactory
                .builderFor(WebClientAdapter.create(client))
                .build();

        return factory.createClient(serviceClass);
    }
}
