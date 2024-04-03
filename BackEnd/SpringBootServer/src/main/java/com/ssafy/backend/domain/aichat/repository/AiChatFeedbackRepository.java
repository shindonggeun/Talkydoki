package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AiChatFeedbackRepository extends JpaRepository<AiChatFeedback, Integer>, AiChatFeedbackRepositoryCustom {
}
