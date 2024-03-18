package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NewsInfo(
        Long id,
        String title,
        String titleTranslated,
        NewsCategory category,
        String content,
        String contentTranslated,
        String summary,
        String summaryTranslated,
        LocalDateTime writeDate,
        String srcOrigin
) {
}
