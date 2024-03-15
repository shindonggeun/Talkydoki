package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsHadoopRepository extends JpaRepository<News, Long> {
    List<News> findAllByOrderByWriteDateDesc();
}
