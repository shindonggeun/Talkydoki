package com.ssafy.backend.domain.aichat.entity.enums;

import lombok.Getter;

/**
 * AI 회화 채팅 카테고리를 나타내는 열거형으로 각 항목에 대한 한글명을 포함합니다.
 */
@Getter
public enum AiChatCategory {
    SOCIETY("사회"),
    WEATHER_AND_DISASTER("날씨 및 재난"),
    POLITICS("정치"),
    BUSINESS("비즈니스"),
    GLOBAL("세계"),
    SPORTS("스포츠"),
    LIFE("생활");

    private final String koreanName;

    AiChatCategory(String koreanName) {
        this.koreanName = koreanName;
    }

}
