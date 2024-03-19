package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.global.common.dto.SliceResponse;
import org.springframework.data.domain.Pageable;

public interface NewsService {

    /**
     * 크롤링한 뉴스를 저장합니다.
     *
     * @param newsPostRequest 뉴스 데이터
     */
    void insertNews(NewsPostRequest newsPostRequest);

    /**
     * 카테로리별 뉴스를 조회합니다. (페이지네이션 적용 - offset 방식)
     *
     * @return 카테로리별 조회된 뉴스
     */
    SliceResponse<NewsSimplyInfo> getNewsByCategory(NewsCategory category, Pageable pageable);

    SliceResponse<NewsSimplyInfo> getNewsList(NewsCategory category, Long lastNewsId, int limit);
}
