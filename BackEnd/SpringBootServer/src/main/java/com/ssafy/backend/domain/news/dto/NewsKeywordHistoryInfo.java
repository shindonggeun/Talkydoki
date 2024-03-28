package com.ssafy.backend.domain.news.dto;

import lombok.Builder;

@Builder
public record NewsKeywordHistoryInfo(String keyword, Integer readCount) {
}
