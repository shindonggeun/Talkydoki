package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiChatReportRepository extends JpaRepository<AiChatReport, Long > {
}
