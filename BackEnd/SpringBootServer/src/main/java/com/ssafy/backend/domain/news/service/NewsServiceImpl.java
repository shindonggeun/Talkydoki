package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.NewsImageInfo;
import com.ssafy.backend.domain.news.dto.NewsInfo;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.NewsImage;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.domain.news.exception.NewsErrorCode;
import com.ssafy.backend.domain.news.exception.NewsException;
import com.ssafy.backend.domain.news.repository.NewsImageRepository;
import com.ssafy.backend.domain.news.repository.NewsRepository;
import com.ssafy.backend.global.common.dto.SliceResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;
    private final NewsImageRepository newsImageRepository;
    private final WebClient webClient;

    @Override
    public Long insertNews(NewsPostRequest newsPostRequest) {
        if (newsRepository.existsBySrcOrigin(newsPostRequest.getSrcOrigin())) {
            throw new NewsException(NewsErrorCode.EXIST_NEWS_SRC_ORIGIN);
        }
        // 일본식 날짜 형식에 맞는 DateTimeFormatter 생성
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("[yyyy年]M月d日[ ]H時m分");
        LocalDateTime writeDateTime;

        try {
            // writeDate 문자열을 LocalDateTime 객체로 변환
            writeDateTime = LocalDateTime.parse(newsPostRequest.getWriteDate(), formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("날짜 형식이 잘못되었습니다: " + newsPostRequest.getWriteDate(), e);
        }

        News savedNews = newsRepository.save(newsPostRequest.toEntity(writeDateTime));
        return  savedNews.getId();
    }

    @Override
    public void insertNewsImage(NewsImageInfo newsImageInfo) {
        News news = newsRepository.findById(newsImageInfo.getNewsId()).orElseThrow(()
                -> new NewsException(NewsErrorCode.NOT_FOUND_NEWS));

        boolean exists = newsImageRepository.existsByImageUrl(newsImageInfo.getImageUrl());
        if (exists) {
            throw new NewsException(NewsErrorCode.EXIST_NEWS_IMAGE);
        }

        NewsImage newsImage = NewsImage.builder()
                .imageUrl(newsImageInfo.getImageUrl())
                .news(news)
                .build();

        newsImageRepository.save(newsImage);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional(readOnly = true)
    public SliceResponse<NewsSimplyInfo> getNewsList(List<String> categories, Long lastNewsId, int limit) {
        List<NewsCategory> categoryEnums = null;
        if (categories != null) {
            categoryEnums = categories.stream()
                    .map(NewsCategory::fromName)
                    .toList();
        }

        Slice<NewsSimplyInfo> newsSimplyInfoList = newsRepository.findNewsListInfoNoOffset(categoryEnums, lastNewsId, limit);
        return SliceResponse.of(newsSimplyInfoList);
    }

    @Override
    public Mono<Map<String, Object>> getNewsRecommendation(Long memberId) {
        return webClient.get()
                .uri("http://j10c107a.p.ssafy.io:8000/recommend/new/{userId}", memberId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    @Transactional(readOnly = true)
    public NewsInfo getNewsInfo(Long newsId) {
        return newsRepository.findNewsInfo(newsId);
    }
}
