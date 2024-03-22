package com.ssafy.backend.domain.news.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsKeywordHistoryInfo {
    Long memberId;
    Long keywordId;
    Integer readCount;
}
