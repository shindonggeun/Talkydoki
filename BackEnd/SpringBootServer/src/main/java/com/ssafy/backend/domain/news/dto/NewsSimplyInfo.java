package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsSimplyInfo {
    Long newsId;
    String title;
    String titleTranslated;
    NewsCategory category;
    LocalDateTime writeDate;
    String srcOrigin;
}
