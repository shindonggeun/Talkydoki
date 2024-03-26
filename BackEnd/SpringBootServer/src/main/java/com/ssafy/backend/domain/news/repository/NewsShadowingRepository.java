package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsShadowing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NewsShadowingRepository extends JpaRepository<NewsShadowing, Long> {
    Optional<NewsShadowing> findByNewsIdAndMemberId(Long newsId, Long memberId);
}
