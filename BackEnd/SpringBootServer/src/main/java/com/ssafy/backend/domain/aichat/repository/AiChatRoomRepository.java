package com.ssafy.backend.domain.aichat.repository;

import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AiChatRoomRepository extends JpaRepository<AiChatRoom, Long> {
    List<AiChatRoom> findByMemberId(Long userId);
    Long countByMemberId(Long memberId);
}
