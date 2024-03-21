package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewsInfo {
    Long newsId;
    String title;
    String titleTranslated;
    NewsCategory category;
    String content;
    String contentTranslated;
    String summary;
    String summaryTranslated;
    LocalDateTime writeDate;
    String srcOrigin;
    List<String>newsImages;
}
