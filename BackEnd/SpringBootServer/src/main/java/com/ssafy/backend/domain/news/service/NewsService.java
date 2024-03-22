package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsImageInfo;
import com.ssafy.backend.domain.news.dto.NewsInfo;
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
    Long insertNews(NewsPostRequest newsPostRequest);

    /**
     * 뉴스 이미지를 저장합니다.
     *
     * @param newsImageInfo 뉴스 이미지 데이터
     */
    void insertNewsImage(NewsImageInfo newsImageInfo);

    /**
     * 선택적으로 카테고리를 기준으로 뉴스 목록을 조회하고, 페이징 처리를 위한 noOffset 방식을 사용합니다.
     * 만약 카테고리가 지정되지 않으면, 모든 카테고리의 뉴스를 반환합니다.
     * lastNewsId가 지정되면, 해당 ID 이하의 뉴스들 중에서 조회합니다.
     *
     * @param categories 뉴스를 필터링할 카테고리의 목록입니다. null일 경우 모든 카테고리에서 조회합니다.
     * @param lastNewsId 조회할 마지막 뉴스의 ID입니다. 이 값이 지정되면, 해당 ID 이하의 뉴스들 중에서 조회합니다.
     * @param limit 한 번에 조회할 뉴스의 최대 개수입니다. 실제 반환되는 뉴스의 수는 이 값보다 하나 적을 수 있습니다.
     * @return 조건에 맞는 뉴스 목록을 포함하는 {@link SliceResponse<NewsSimplyInfo>} 객체를 반환합니다.
     */
    SliceResponse<NewsSimplyInfo> getNewsList(List<String> categories, Long lastNewsId, int limit);

    /**
     * 사용자에 맞는 뉴스를 추천합니다.
     *
     * @param memberId 사용자 PK
     */
    Mono<Map<String, Object>> getNewsRecommendation(Long memberId);

    /**
     * 뉴스 디테일 정보를 조회합니다.
     *
     * @param newsId) 뉴스 디테일 정보
     */
    NewsInfo getNewsInfo(Long memberId, Long newsId);
}
