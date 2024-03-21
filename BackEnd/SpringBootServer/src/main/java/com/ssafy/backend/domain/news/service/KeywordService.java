package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.KeywordMappingRequest;
import com.ssafy.backend.domain.news.dto.KeywordPostRequest;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface KeywordService {

    /**
     * 일본어 키워드를 저장합니다.
     *
     * @param keywordPostRequest 키워드 데이터
     */
    void insertKeyword(KeywordPostRequest keywordPostRequest);

    /**
     * 뉴스 - 단어 가중치를 저장합니다.
     *
     * @param keywordMappingRequest 키워드 가중치 데이터
     */
    void insertWeight(KeywordMappingRequest keywordMappingRequest);

    /**
     * 사용자에 맞는 단어를 추천합니다.
     *
     * @param memberId 사용자 PK
     */
    Mono<Map<String, Object>> getWordRecommendation(Long memberId);
}
