package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiChatHistoryRepository extends JpaRepository<AiChatHistory,Long> {
    List<AiChatHistory> findByAiChatRoomId(Long roomId);

    List<AiChatHistory> findByAiChatRoom(AiChatRoom aiChatRoom);
}
