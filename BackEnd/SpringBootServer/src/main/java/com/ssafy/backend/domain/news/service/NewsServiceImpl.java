package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.NewsDataRequest;
import com.ssafy.backend.domain.news.repository.NewsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public void insertNews(NewsDataRequest newsDataRequest) {

        // 일본식 날짜 형식에 맞는 DateTimeFormatter 생성
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("[yyyy年]M月d日[ ]H時m分");
        LocalDateTime writeDateTime;

        try {
            // writeDate 문자열을 LocalDateTime 객체로 변환
            writeDateTime = LocalDateTime.parse(newsDataRequest.getWriteDate(), formatter);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("날짜 형식이 잘못되었습니다: " + newsDataRequest.getWriteDate(), e);
        }

        newsRepository.save(newsDataRequest.toEntity(writeDateTime));
    }
}
