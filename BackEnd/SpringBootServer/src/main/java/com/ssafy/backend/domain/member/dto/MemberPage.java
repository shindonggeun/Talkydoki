package com.ssafy.backend.domain.member.dto;

import com.ssafy.backend.domain.news.dto.AverageScoreDate;
import com.ssafy.backend.domain.news.dto.UserScoreDate;
import lombok.Builder;

import java.util.List;

@Builder
public record MemberPage(
        Long totalShaded,
        Long totalTalked,
        List<UserScoreDate> userScore,
        List<AverageScoreDate> averageScore
) {
}