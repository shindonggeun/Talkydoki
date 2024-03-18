package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.repository.NewsHadoopRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;


@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NewsHadoopServiceImpl implements NewsHadoopService {
    private final NewsHadoopRepository newsHadoopRepository;
    @Override
    @Transactional(readOnly = true)
    public List<News> getAllNews() {
        // 카테고리별로 뉴스를 조회하고, 리미트를 적용하여 반환
        return newsHadoopRepository.findAllByOrderByWriteDateDesc();
    }
}
