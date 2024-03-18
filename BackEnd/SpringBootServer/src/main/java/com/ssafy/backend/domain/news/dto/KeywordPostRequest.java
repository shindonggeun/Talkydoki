package com.ssafy.backend.domain.news.dto;

import com.ssafy.backend.domain.news.entity.Keyword;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KeywordPostRequest {

    @NotBlank(message = "일본어는 필수 입력값입니다.")
    private String japanese;

    public Keyword toEntity() {
        return Keyword.builder()
                .japanese(japanese)
                .build();
    }
}
