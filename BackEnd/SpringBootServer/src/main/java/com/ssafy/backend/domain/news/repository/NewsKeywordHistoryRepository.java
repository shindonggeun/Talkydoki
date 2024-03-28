package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsKeywordHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsKeywordHistoryRepository extends JpaRepository<NewsKeywordHistory, Long> {
    boolean existsByKeywordId(Long keywordId);

    NewsKeywordHistory findByKeywordId(Long keywordId);

    List<NewsKeywordHistory> findByMemberIdOrderByReadCountDesc(Long memberID);
}
