package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiChatRoomRepository extends JpaRepository<AiChatRoom, Long> {
    List<AiChatRoom> findByMemberId(Long userId);
    Long countByMemberId(Long memberId);
}
