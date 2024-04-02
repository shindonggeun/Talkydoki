package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.news.dto.KeywordMappingRequest;
import com.ssafy.backend.domain.news.dto.KeywordPostRequest;
import com.ssafy.backend.domain.news.dto.NewsKeywordHistoryInfo;
import com.ssafy.backend.domain.news.entity.Keyword;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.NewsKeywordHistory;
import com.ssafy.backend.domain.news.entity.NewsKeywordMapping;
import com.ssafy.backend.domain.news.exception.KeywordErrorCode;
import com.ssafy.backend.domain.news.exception.KeywordException;
import com.ssafy.backend.domain.news.exception.NewsErrorCode;
import com.ssafy.backend.domain.news.exception.NewsException;
import com.ssafy.backend.domain.news.repository.KeywordRepository;
import com.ssafy.backend.domain.news.repository.NewsKeywordHistoryRepository;
import com.ssafy.backend.domain.news.repository.NewsKeywordMappingRepository;
import com.ssafy.backend.domain.news.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class KeywordServiceImpl implements KeywordService {

    private final NewsRepository newsRepository;
    private final KeywordRepository keywordRepository;
    private final NewsKeywordMappingRepository newsKeywordMappingRepository;
    private final NewsKeywordHistoryRepository newsKeywordHistoryRepository;

    @Override
    public void insertKeyword(KeywordPostRequest keywordPostRequest) {
        // 입력받은 일본어가 DB에 존재할 경우 : 예외 처리
        if (keywordRepository.existsByJapanese(keywordPostRequest.getJapanese())) {
            throw new KeywordException(KeywordErrorCode.EXIST_KEYWORD);
        }
        // DB에 존재하지 않는 경우 : 키워드 저장
        keywordRepository.save(keywordPostRequest.toEntity());
    }

    @Override
    public void insertWeight(KeywordMappingRequest keywordMappingRequest) {
        News news = newsRepository.findById(keywordMappingRequest.getNewsId())
                .orElseThrow(() -> new NewsException(NewsErrorCode.NOT_FOUND_NEWS));

        List<NewsKeywordMapping> existingMappings = newsKeywordMappingRepository.findByNews(news);
        if (!existingMappings.isEmpty()) {
            newsKeywordMappingRepository.deleteAll(existingMappings);
        }

        List<NewsKeywordMapping> newMappings = keywordMappingRequest.getKeywords().stream().map(kw -> {
            Keyword keyword = keywordRepository.findByJapanese(kw.getJapanese())
                    .orElseThrow(() -> new KeywordException(KeywordErrorCode.NOT_FOUND_KEYWORD));
            return NewsKeywordMapping.builder()
                    .news(news)
                    .keyword(keyword)
                    .weight(kw.getWeight())
                    .build();
        }).collect(Collectors.toList());

        newsKeywordMappingRepository.saveAll(newMappings);
    }

    @Override
    public List<NewsKeywordHistoryInfo> getKeywordsByMemberId(Long memberId) {
        List<NewsKeywordHistory> histories = newsKeywordHistoryRepository.findByMemberIdOrderByReadCountDesc(memberId);
        return histories.stream()
                .map(history -> new NewsKeywordHistoryInfo(history.getKeyword().getJapanese(), history.getReadCount()))
                .limit(10)
                .toList();
    }
}
