package com.ssafy.backend.domain.news.repository;

import com.ssafy.backend.domain.news.entity.NewsImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsImageRepository extends JpaRepository<NewsImage, Long> {
    boolean existsByImageUrl(String imageUrl);
}
