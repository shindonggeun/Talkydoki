package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.ShadowingEvaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;

public interface ShadowingEvaluationRepository extends JpaRepository<ShadowingEvaluation, Long> {
    // 해당 유저의 날짜 별 쉐도잉 점수 조회
    @Query("SELECT AVG(se.score), CAST(se.newsShadowing.createdAt AS date) FROM ShadowingEvaluation se WHERE se.newsShadowing.member.id = :memberId AND se.newsShadowing.createdAt BETWEEN :startDate AND :endDate GROUP BY CAST(se.newsShadowing.createdAt AS date)")
    List<Object[]> findAverageScoresByDateForMember(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
    // 전체 유저의 날짜 별 쉐도잉 평균 점수 조회
    @Query("SELECT AVG(se.score), CAST(se.newsShadowing.createdAt AS date) FROM ShadowingEvaluation se WHERE se.newsShadowing.createdAt BETWEEN :startDate AND :endDate GROUP BY CAST(se.newsShadowing.createdAt AS date)")
    List<Object[]> findAverageScoresByDateForAllUsers(LocalDateTime startDate, LocalDateTime endDate);
    // 특정 사용자의 쉐도잉 평가 총 횟수를 조회하는 메소드
    @Query("SELECT COUNT(se) FROM ShadowingEvaluation se WHERE se.newsShadowing.member.id = :memberId")
    Long countByMemberId(Long memberId);
}
