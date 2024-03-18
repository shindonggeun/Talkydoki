package com.ssafy.backend.domain.news.service;
import com.ssafy.backend.domain.news.entity.News;
import java.util.List;

public interface NewsHadoopService {

    /**
     * 전체 뉴스를 조회합니다.
     *
     * @return 전체 조회된 뉴스
     */
    List<News> getAllNews();
}
