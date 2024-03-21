package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.news.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    boolean existsByJapanese(String japanese);

    Optional<Keyword> findByJapanese(String japanese);
}
