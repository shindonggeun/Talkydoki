package com.ssafy.backend.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * Spring의 비동기 처리를 위한 설정 클래스입니다.
 * {@link EnableAsync} 어노테이션을 사용하여 비동기 기능을 활성화하고,
 * 비동기 처리에 사용될 Executor를 구성합니다.
 */
@Configuration
@EnableAsync
public class SpringAsyncConfig {

    /**
     * ThreadPoolTaskExecutor를 구성하고 빈으로 등록하는 메서드입니다.
     * 이 Executor는 비동기 처리를 위한 스레드 풀을 관리합니다.
     *
     * @return 구성된 Executor 인스턴스를 반환합니다.
     */
    @Bean(name = "threadPoolTaskExecutor")
    public Executor threadPoolTaskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();

        // 기본적으로 활성 상태를 유지할 스레드의 수를 설정합니다.
        // 애플리케이션이 시작되고 작업이 없을 때 유지되는 스레드의 최소 수입니다.
        taskExecutor.setCorePoolSize(3);

        // 풀이 허용하는 최대 스레드 수를 설정합니다.
        // 동시에 실행될 수 있는 최대 스레드 수입니다.
        taskExecutor.setMaxPoolSize(30);

        // 작업 큐의 용량을 설정합니다.
        // 모든 스레드가 바쁠 때, 추가로 대기할 작업의 수입니다.
        taskExecutor.setQueueCapacity(100);

        // 스레드 이름의 접두사를 설정하여, 로그나 스레드 모니터링 시 식별을 용이하게 합니다.
        taskExecutor.setThreadNamePrefix("Executor-");

        return taskExecutor;
    }
}

