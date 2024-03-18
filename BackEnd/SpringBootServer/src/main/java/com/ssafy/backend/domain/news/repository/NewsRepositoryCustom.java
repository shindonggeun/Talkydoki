package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.dto.NewsListInfo;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepositoryCustom {
    Slice<NewsListInfo> findNewsListInfo(NewsCategory category, Pageable pageable);
}
