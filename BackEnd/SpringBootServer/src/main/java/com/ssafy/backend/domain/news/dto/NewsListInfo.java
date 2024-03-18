package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NewsListInfo(
        Long id,
        String title,
        NewsCategory category,
        LocalDateTime writeDate,
        String srcOrigin
) {
}
