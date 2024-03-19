package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.global.common.dto.SliceResponse;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Mono;

import java.util.List;

import java.util.Map;

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

    SliceResponse<NewsSimplyInfo> getNewsList(List<String> categories, Long lastNewsId, int limit);

    /**
     * 사용자 ID에 맞는 뉴스를 추천합니다.
     *
     * @param memberId 사용자 PK
     */
    Mono<Map<String, Object>> getNewsRecommendation(Long memberId);
}
