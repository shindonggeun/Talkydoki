package com.ssafy.backend.domain.attendance.repository;

import com.ssafy.backend.domain.attendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    // 이번 년도의 특정 회원의 출석 기록을 조회하는 쿼리
    @Query(value = "SELECT * FROM attendance WHERE member_id = :memberId AND YEAR(created_at) = YEAR(CURRENT_DATE)", nativeQuery = true)
    List<Attendance> findByMemberIdThisYear(Long memberId);
}
