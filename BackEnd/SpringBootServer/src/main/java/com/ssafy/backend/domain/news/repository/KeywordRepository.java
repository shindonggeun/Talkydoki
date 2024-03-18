package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    boolean existsByJapanese(String japanese);
}
