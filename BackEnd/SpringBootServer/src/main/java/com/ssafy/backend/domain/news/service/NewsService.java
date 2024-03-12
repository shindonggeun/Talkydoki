package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.NewsDataRequest;

public interface NewsService {

    /**
     * 크롤링한 뉴스를 저장합니다.
     *
     * @param newsDataRequest 뉴스 데이터
     */
    void insertNews(NewsDataRequest newsDataRequest);
}
