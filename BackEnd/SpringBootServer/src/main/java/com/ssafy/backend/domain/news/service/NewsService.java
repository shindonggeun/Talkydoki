package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.dto.NewsImageInfo;
import com.ssafy.backend.domain.news.dto.NewsListInfo;
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
    Long insertNews(NewsPostRequest newsPostRequest);

    /**
     * 뉴스 이미지를 저장합니다.
     *
     * @param newsImageInfo 뉴스 이미지 데이터
     */
    void insertNewsImage(NewsImageInfo newsImageInfo);

    /**
     * 카테로리별 뉴스를 조회합니다. (페이지네이션 적용 - offset 방식)
     *
     * @return 카테로리별 조회된 뉴스
     */
    SliceResponse<NewsListInfo> getNewsByCategory(NewsCategory category, Pageable pageable);


}
