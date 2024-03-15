package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsInfo;
import com.ssafy.backend.domain.news.dto.NewsListInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.domain.Page;

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
    Page<NewsListInfo> getNewsByCategory(NewsCategory category, int page, int size);
}
