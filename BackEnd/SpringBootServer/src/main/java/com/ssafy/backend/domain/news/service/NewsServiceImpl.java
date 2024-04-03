package com.ssafy.backend.domain.news.service;

import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;
import com.ssafy.backend.domain.attendance.service.AttendanceService;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.news.dto.*;
import com.ssafy.backend.domain.news.entity.*;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.domain.news.exception.KeywordErrorCode;
import com.ssafy.backend.domain.news.exception.KeywordException;
import com.ssafy.backend.domain.news.exception.NewsErrorCode;
import com.ssafy.backend.domain.news.exception.NewsException;
import com.ssafy.backend.domain.news.repository.*;
import com.ssafy.backend.global.common.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.apache.commons.text.similarity.LevenshteinDistance;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NewsServiceImpl implements NewsService {

    private final MemberRepository memberRepository;
    private final NewsRepository newsRepository;
    private final NewsImageRepository newsImageRepository;
    private final KeywordRepository keywordRepository;
    private final NewsKeywordHistoryRepository newsKeywordHistoryRepository;
    private final NewsShadowingRepository newsShadowingRepository;
    private final ShadowingEvaluationRepository shadowingEvaluationRepository;
    private final WebClient webClient;
    private final AttendanceService attendanceService;

    @Override
    public Long insertNews(NewsPostRequest newsPostRequest) {
        if (newsRepository.existsBySrcOrigin(newsPostRequest.getSrcOrigin())) {
            throw new NewsException(NewsErrorCode.EXIST_NEWS_SRC_ORIGIN);
        }
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
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
                .uri("http://j10c107a.p.ssafy.io:8000/recommend/news/{userId}", memberId)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {});
    }

    @Override
    public NewsInfo getNewsInfo(Long memberId, Long newsId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        NewsInfo newsInfo = newsRepository.findNewsInfo(newsId);
        if (newsInfo == null) {
            throw new NewsException(NewsErrorCode.NOT_FOUND_NEWS);
        }

        for (String newsKeyword : newsInfo.getNewsKeywords()) {
            Keyword keyword = keywordRepository.findByJapanese(newsKeyword).orElseThrow(()
                    -> new KeywordException(KeywordErrorCode.NOT_FOUND_KEYWORD));
            boolean exists = newsKeywordHistoryRepository.existsByKeywordIdAndMemberId(keyword.getId(), memberId);
            NewsKeywordHistory newsKeywordHistory;
            if (exists) {
                newsKeywordHistory = newsKeywordHistoryRepository.findByKeywordIdAndMemberId(keyword.getId(), memberId);
                newsKeywordHistory.setReadCount(newsKeywordHistory.getReadCount() + 1);
            }
            else {
                newsKeywordHistory = NewsKeywordHistory.builder()
                        .member(member)
                        .keyword(keyword)
                        .readCount(1)
                        .build();
            }
            newsKeywordHistoryRepository.save(newsKeywordHistory);
        }
        return newsInfo;
    }

    @Override
    public ShadowingResponse calculateSimilarity(ShadowingRequest shadowingRequest, Long memberId, Long newsId) {
        LevenshteinDistance levenshteinDistance = new LevenshteinDistance();
        int distance = levenshteinDistance.apply(shadowingRequest.original(), shadowingRequest.userText());
        int maxLength = Math.max(shadowingRequest.original().length(), shadowingRequest.userText().length());
        double similarity = Math.round((1 - (double) distance / maxLength) * 10) / 2.0;

        News news = newsRepository.findById(newsId).orElseThrow(()
                -> new NewsException(NewsErrorCode.NOT_FOUND_NEWS));
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        Optional<NewsShadowing> existingNewsShadowing = newsShadowingRepository.findByNewsIdAndMemberId(newsId, memberId);

        NewsShadowing newsShadowing = existingNewsShadowing.orElseGet(() -> newsShadowingRepository.save(NewsShadowing.builder()
                .news(news)
                .member(member)
                .build()));

        ShadowingEvaluation shadowingEvaluation = ShadowingEvaluation.builder()
                .score(similarity)
                .newsShadowing(newsShadowing)
                .build();
        shadowingEvaluationRepository.save(shadowingEvaluation);
        attendanceService.createAttendance(memberId, AttendanceType.NEWS_SHADOWING);
        
        return new ShadowingResponse(similarity);
    }
}
