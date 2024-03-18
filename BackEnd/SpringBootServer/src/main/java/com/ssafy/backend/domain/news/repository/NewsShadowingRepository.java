package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsShadowing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsShadowingRepository extends JpaRepository<NewsShadowing, Long> {
}
