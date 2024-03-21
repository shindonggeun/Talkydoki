package com.ssafy.backend.domain.news.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeywordMappingRequest {

    @NotBlank(message = "뉴스 아이디는 필수 입력값입니다.")
    private Long newsId;

    @NotBlank(message = "일본어는 필수 입력값입니다.")
    private String japanese;

    @NotBlank(message = "가중치는 필수 입력값입니다.")
    private Float weight;
}
