package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long>, NewsRepositoryCustom {
    boolean existsBySrcOrigin(String srcOrigin);
}
