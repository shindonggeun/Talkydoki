package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.dto.NewsInfo;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

/**
 * 뉴스 데이터에 대한 커스텀 리포지토리 인터페이스입니다.
 * 복잡한 쿼리 및 동적 쿼리를 처리하기 위해 정의되었습니다.
 */
public interface NewsRepositoryCustom {

    /**
     * noOffset 방식을 사용하여 뉴스 목록을 조회합니다.
     * 이 방식은 기존의 페이지 기반 페이징 대신, 마지막 뉴스 ID를 기준으로 데이터를 조회하는 방법입니다.
     *
     * @param categories 조회할 뉴스의 카테고리 목록. 카테고리가 지정되지 않은 경우 모든 카테고리에서 조회합니다.
     * @param lastNewsId 조회할 마지막 뉴스 ID. 이 값이 지정되면, 해당 ID 이하의 뉴스들 중에서 조회합니다.
     * @param limit 한 번에 조회할 뉴스의 최대 개수.
     * @return 조회된 뉴스 목록을 담은 Slice 객체.
     */
    Slice<NewsSimplyInfo> findNewsListInfoNoOffset(List<NewsCategory> categories, Long lastNewsId, int limit);

    /**
     * 뉴스 정보을 조회합니다.
     *
     * @param newsId 조회할 뉴스의 아이디
     * @return 뉴스 정보을 담은 객체.
     */
     NewsInfo findNewsInfo(Long newsId);
}
