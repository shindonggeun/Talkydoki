package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AiChatReportRepository extends JpaRepository<AiChatReport, Long > {
    Optional<AiChatReport> findByAiChatRoomId(Long aiChatRoomId);

    Long countByAiChatRoom_MemberId(Long memberId);
}
