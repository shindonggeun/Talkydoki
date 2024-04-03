package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsKeywordHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsKeywordHistoryRepository extends JpaRepository<NewsKeywordHistory, Long> {
    boolean existsByKeywordIdAndMemberId(Long keywordId, Long memberId);

    NewsKeywordHistory findByKeywordIdAndMemberId(Long keywordId, Long memberId);

    List<NewsKeywordHistory> findByMemberIdOrderByReadCountDesc(Long memberID);
}
