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

    private Long newsId;

    private String japanese;

    private Float weight;
}
