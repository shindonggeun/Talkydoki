package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class NewsPostRequest {
    @NotBlank(message = "제목은 필수 입력값입니다")
    private String title;

    @NotBlank(message = "제목 번역은 필수 입력값입니다")
    private String titleTranslated;

    private NewsCategory category;

    @NotBlank(message = "내용은 필수 입력값입니다")
    private String content;

    @NotBlank(message = "내용 번역은 필수 입력값입니다")
    private String contentTranslated;

    @NotBlank(message = "요약은 필수 입력값입니다")
    private String summary;

    @NotBlank(message = "요약 번역은 필수 입력값입니다")
    private String summaryTranslated;

    @NotBlank(message = "작성 날짜는 필수 입력값입니다")
    private String writeDate;

    @NotBlank(message = "원문 링크는 필수 입력값입니다")
    private String srcOrigin;

    public News toEntity(LocalDateTime writeDateTime) {
        return News.builder()
                .title(title)
                .titleTranslated(titleTranslated)
                .category(category)
                .content(content)
                .contentTranslated(contentTranslated)
                .summary(summary)
                .summaryTranslated(summaryTranslated)
                .writeDate(writeDateTime)
                .srcOrigin(srcOrigin)
                .build();
    }
}