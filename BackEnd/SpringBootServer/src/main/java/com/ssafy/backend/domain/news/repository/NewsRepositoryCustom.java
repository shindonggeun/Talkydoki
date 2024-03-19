package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface NewsRepositoryCustom {
    Slice<NewsSimplyInfo> findNewsListInfo(NewsCategory category, Pageable pageable);

    Slice<NewsSimplyInfo> findNewsListInfoNoOffset(NewsCategory category, Long lastNewsId, int limit);
}
