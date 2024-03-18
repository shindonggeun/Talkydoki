package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.dto.NewsListInfo;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Repository
public interface NewsRepository extends JpaRepository<News, Long>, NewsRepositoryCustom {
    boolean existsBySrcOrigin(String srcOrigin);
}
