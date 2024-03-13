package com.ssafy.backend.domain.aichat.entity.enums;


public enum Category {
    SOCIETY, WEATHER_AND_DISASTER, POLITICS, BUSINESS, GLOBAL, SPORTS, LIFE;

    public static Category fromName(String category) {
        return Category.valueOf(category.toUpperCase());
    }
}
