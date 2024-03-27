package com.ssafy.backend.domain.news.dto;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserScoreDate(Double score, LocalDateTime date) {
}