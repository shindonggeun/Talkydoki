package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.Keyword;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.NewsKeywordMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NewsKeywordMappingRepository extends JpaRepository<NewsKeywordMapping, Long> {
    Optional<NewsKeywordMapping> findByNewsAndKeyword(News news, Keyword keyword);
}
