package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.ShadowingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ShadowingEvaluationRepository extends JpaRepository<ShadowingEvaluation, Long> {
    // 해당 유저의 날짜 별 쉐도잉 점수 조회
    @Query("SELECT se.score, se.newsShadowing.createdAt FROM ShadowingEvaluation se WHERE se.newsShadowing.member.id = :memberId")
    List<Object[]> findScoresAndDatesByMemberId(Long memberId);
    // 전체 유저의 날짜 별 쉐도잉 평균 점수 조회
    @Query("SELECT AVG(se.score), se.newsShadowing.createdAt FROM ShadowingEvaluation se WHERE se.newsShadowing.createdAt BETWEEN :startDate AND :endDate GROUP BY se.newsShadowing.createdAt")
    List<Object[]> findAverageScoresByDateForAllUsers(LocalDate startDate, LocalDate endDate);
}
