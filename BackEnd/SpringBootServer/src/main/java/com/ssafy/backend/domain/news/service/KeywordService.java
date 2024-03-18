package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.KeywordPostRequest;

public interface KeywordService {

    /**
     * 일본어 키워드를 저장합니다.
     *
     * @param keywordPostRequest 키워드 데이터
     */
    void insertKeyword(KeywordPostRequest keywordPostRequest);
}
