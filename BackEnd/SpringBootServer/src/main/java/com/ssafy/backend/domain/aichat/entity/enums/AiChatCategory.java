package com.ssafy.backend.domain.aichat.entity.enums;

import lombok.Getter;

/**
 * AI 회화 채팅 카테고리를 나타내는 열거형으로 각 항목에 대한 한글명을 포함합니다.
 */
@Getter
public enum AiChatCategory {
    CHANGE_AT_CONVENIENCE_STORE("편의점에서 잔돈 거스르기, (GPT는 편의점 점주, USER는 고객)"),
    HOTEL_CHECK_IN("호텔 체크인하기 (GPT는 호텔 지배인, USER는 호텔 체크인하는 사람)"),
    SOCCER_CONVERSATION("축구 대화하기"),
    ORDER_HAMBURGER("햄버거 주문하기 (GPT는 햄버거 가게 점원), USER는 햄버거 주문하는 고객"),
    HAIRCUT_AT_SALON("미용실에서 머리 자르기 (GPT는 미용실 점원, USER는 미용실 이용하는 고객)"),
    DESCRIBE_HEALTH_CONDITION_AT_HOSPITAL("병원에서 몸상태 말하기"),
    FIND_LOST_ITEM_AT_POLICE_STATION("경찰서에서 분실물 찾기 (GPT는 경찰, USER는 분실한 사람"),
    ENGAGE_IN_SOCIAL_DISCUSSION("사회적 토론하기"),
    BEFRIEND_A_COLLEAGUE("동료와 친해지기"),
    BRUNCH_CONVERSATION("브런치 식사 대화하기");

    private final String koreanName;

    AiChatCategory(String koreanName) {
        this.koreanName = koreanName;
    }

}
