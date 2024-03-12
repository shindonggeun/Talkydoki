package com.ssafy.backend.domain.news.entity.enums;

public enum NewsCategory {
    SOCIETY,
    WEATHER_DISASTER,
    SCIENCE_CULTURE,
    POLITICS,
    BUSINESS,
    INTERNATIONAL,
    SPORTS,
    LIFE;

    public static NewsCategory fromName(String roleName) { return NewsCategory.valueOf(roleName.toUpperCase());}
}
