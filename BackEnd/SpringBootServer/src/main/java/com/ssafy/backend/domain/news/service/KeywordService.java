package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.KeywordMappingRequest;
import com.ssafy.backend.domain.news.dto.KeywordPostRequest;
import com.ssafy.backend.domain.news.dto.NewsKeywordHistoryInfo;
import reactor.core.publisher.Mono;

import java.util.List;
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
     * 사용자 관심 키워드를 출력합니다.
     *
     * @param memberId 사용자 ID
     */
    List<NewsKeywordHistoryInfo> getKeywordsByMemberId(Long memberId);
}
