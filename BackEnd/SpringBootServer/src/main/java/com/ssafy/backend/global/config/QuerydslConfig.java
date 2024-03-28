package com.ssafy.backend.global.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Querydsl 설정을 위한 구성 클래스입니다.
 * 이 클래스는 JPAQueryFactory를 스프링 빈으로 등록하여, Querydsl을 사용한 동적 쿼리 생성을 지원합니다.
 */
@Configuration
public class QuerydslConfig {

    /**
     * EntityManager를 주입받기 위한 PersistenceContext 어노테이션.
     * EntityManager는 JPA의 영속성 컨텍스트에 대한 접근을 제공하며,
     * 데이터베이스 오퍼레이션을 수행하는 데 필요한 API를 제공합니다.
     */
    @PersistenceContext
    private EntityManager entityManager;

    /**
     * JPAQueryFactory를 스프링 빈으로 등록하는 메소드입니다.
     * JPAQueryFactory는 Querydsl의 JPA 구현을 사용하여 타입 안전 쿼리를 생성합니다.
     * 이 메소드는 EntityManager를 사용하여 JPAQueryFactory의 인스턴스를 생성하고 반환합니다.
     *
     * @return JPAQueryFactory의 새 인스턴스
     */
    @Bean
    public JPAQueryFactory jpaQueryFactory() {
        // EntityManager와 연결된 새 JPAQueryFactory 인스턴스를 생성하여 반환
        return new JPAQueryFactory(entityManager);
    }
}

