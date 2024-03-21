package com.ssafy.backend.domain.news.controller;

import com.ssafy.backend.domain.news.dto.NewsImageInfo;
import com.ssafy.backend.domain.news.dto.NewsInfo;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.service.NewsService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.common.dto.SliceResponse;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Tag(name = "뉴스", description = "뉴스 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/news")
public class NewsController {
    private final NewsService newsService;

    @Operation(
            summary = "크롤링한 뉴스 저장",
            description = "크롤링한 뉴스를 DB에 저장하는 기능입니다."
    )
    @PostMapping("/post")
    public ResponseEntity<Message<Long>> insertNews(@Valid @RequestBody NewsPostRequest newsPostRequest) {
        Long newsId = newsService.insertNews(newsPostRequest);
        return ResponseEntity.ok().body(Message.success(newsId));
    }

    @Operation(
            summary = "뉴스 이미지 저장",
            description = "뉴스 이미지를 DB에 저장하는 기능입니다."

    )
    @PostMapping("/images/post")
    public ResponseEntity<Message<Void>> insertNewsImage(@Valid @RequestBody NewsImageInfo newsImageInfo) {
        newsService.insertNewsImage(newsImageInfo);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "뉴스 목록 가져오기",
            description = "뉴스 목록을 불러오는 기능입니다. noOffset 방식이 적용되어 있습니다."
    )
    @GetMapping("/list/get")
    public ResponseEntity<Message<SliceResponse<NewsSimplyInfo>>> getNewsList(@RequestParam(required = false) List<String> categories,
                                                                              @RequestParam(required = false) Long lastNewsId,
                                                                              @RequestParam(defaultValue = "11") int limit) {
        SliceResponse<NewsSimplyInfo> newsSimplyInfoList = newsService.getNewsList(categories, lastNewsId, limit);
        return ResponseEntity.ok().body(Message.success(newsSimplyInfoList));
    }

    @Operation(
            summary = "사용자 뉴스 추천",
            description = "사용자에게 맞춤형 뉴스를 추천하는 기능입니다."
    )
    @GetMapping("/recommend")
    public Mono<Map<String, Object>> getNewsRecommendation(@AuthenticationPrincipal MemberLoginActive loginActive) {
        return newsService.getNewsRecommendation(loginActive.id());
    }

    @Operation(
            summary = "뉴스 디테일 조회",
            description = "뉴스 디테일 조회하는 기능입니다."
    )
    @GetMapping("/get/{newsId}")
    public ResponseEntity<Message<NewsInfo>> getNewsInfo(@PathVariable Long newsId) {
        NewsInfo newsInfo = newsService.getNewsInfo(newsId);
        return ResponseEntity.ok().body(Message.success(newsInfo));
    }
}
