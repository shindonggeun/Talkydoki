package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record NewsInfo(
        Long id,
        String title,
        NewsCategory category,
        String content,
        String summary,
        LocalDateTime writeDate,
        String srcOrigin
) {
}
