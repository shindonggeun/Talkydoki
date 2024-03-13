package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.domain.Page;

import java.util.List;

public interface NewsService {

    /**
     * 크롤링한 뉴스를 저장합니다.
     *
     * @param newsPostRequest 뉴스 데이터
     */
    void insertNews(NewsPostRequest newsPostRequest);

    /**
     * 카테로리별 뉴스를 조회합니다.
     *
     * @return 카테로리별 조회된 뉴스
     */
    Page<News> getNewsByCategory(NewsCategory category, int page, int size);

    /**
     * 전체 뉴스를 조회합니다.
     *
     * @return 전체 조회된 뉴스
     */
    Page<News> getAllNews(int page, int size);
}
