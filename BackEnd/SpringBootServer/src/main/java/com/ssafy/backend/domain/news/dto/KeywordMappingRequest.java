package com.ssafy.backend.domain.news.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeywordMappingRequest {

    private Long newsId;

    private List<KeywordWeight> keywords;
}
