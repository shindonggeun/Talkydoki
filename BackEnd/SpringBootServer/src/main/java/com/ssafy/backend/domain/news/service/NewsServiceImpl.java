package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.domain.news.exception.NewsErrorCode;
import com.ssafy.backend.domain.news.exception.NewsException;
import com.ssafy.backend.domain.news.repository.NewsRepository;
import com.ssafy.backend.global.common.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;

    @Override
    public void insertNews(NewsPostRequest newsPostRequest) {
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

        newsRepository.save(newsPostRequest.toEntity(writeDateTime));
    }
    @Override
    @Transactional(readOnly = true)
    public SliceResponse<NewsSimplyInfo> getNewsByCategory(NewsCategory category, Pageable pageable) {
        // 카테고리별로 뉴스를 조회하고, 리미트를 적용하여 반환
        Slice<NewsSimplyInfo> newsListInfo = newsRepository.findNewsListInfo(category, pageable);
        return SliceResponse.of(newsListInfo);
    }

    @Override
    public SliceResponse<NewsSimplyInfo> getNewsList(NewsCategory category, Long lastNewsId, int limit) {
        Slice<NewsSimplyInfo> newsSimplyInfoList = newsRepository.findNewsListInfoNoOffset(category, lastNewsId, limit);
        return SliceResponse.of(newsSimplyInfoList);
    }
}
