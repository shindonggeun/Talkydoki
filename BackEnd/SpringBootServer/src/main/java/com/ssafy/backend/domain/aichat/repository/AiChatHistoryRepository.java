package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiChatHistoryRepository extends JpaRepository<AiChatHistory,Long> {
    List<AiChatHistory> findByAiChatRoomId(Long roomId);

    List<AiChatHistory> findByAiChatRoom(AiChatRoom aiChatRoom);
}
