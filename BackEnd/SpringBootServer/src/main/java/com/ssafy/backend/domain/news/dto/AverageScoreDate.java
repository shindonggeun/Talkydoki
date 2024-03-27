package com.ssafy.backend.domain.news.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record AverageScoreDate(Double averageScore, LocalDate date) {
}