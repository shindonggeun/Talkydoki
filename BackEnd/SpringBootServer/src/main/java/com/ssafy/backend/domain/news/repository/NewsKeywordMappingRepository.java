package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsKeywordMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsKeywordMappingRepository extends JpaRepository<NewsKeywordMapping, Long> {
}
