package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.NewsKeywordMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsKeywordMappingRepository extends JpaRepository<NewsKeywordMapping, Long> {
    List<NewsKeywordMapping> findByNews(News news);
}
