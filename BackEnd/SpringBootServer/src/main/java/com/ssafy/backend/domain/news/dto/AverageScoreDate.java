package com.ssafy.backend.domain.news.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record AverageScoreDate(Double averageScore, LocalDateTime date) {
}