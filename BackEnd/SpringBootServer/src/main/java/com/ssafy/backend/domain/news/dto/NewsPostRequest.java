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

    private NewsCategory category;

    @NotBlank(message = "내용은 필수 입력값입니다")
    private String content;

    @NotBlank(message = "요약은 필수 입력값입니다")
    private String summary;

    // 이제 writeDate는 String 타입으로 받습니다.
    @NotBlank(message = "작성 날짜는 필수 입력값입니다")
    private String writeDate;

    @NotBlank(message = "원문 링크는 필수 입력값입니다")
    private String srcOrigin;

    // toEntity 메소드에서는 writeDate 변환 로직을 적용하지 않습니다.
    // 변환 로직은 서비스 레이어에서 처리해야 합니다.
    public News toEntity(LocalDateTime writeDateTime) {
        return News.builder()
                .title(title)
                .category(category)
                .content(content)
                .summary(summary)
                .writeDate(writeDateTime) // 서비스 레이어에서 변환된 LocalDateTime 객체를 사용
                .srcOrigin(srcOrigin)
                .build();
    }
}