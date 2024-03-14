package com.ssafy.backend.domain.news.controller;

import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.domain.news.service.NewsService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Message<Void>> insertNews(@Valid @RequestBody NewsPostRequest newsPostRequest) {
        newsService.insertNews(newsPostRequest);
        return ResponseEntity.ok().body(Message.success());
    }
    @Operation(
            summary = "뉴스 불러오기",
            description = "뉴스 정보를 불러오는 기능입니다."
    )
    @GetMapping("/get")
    public ResponseEntity<Message<Page<News>>> getNews(
            @RequestParam(required = false) NewsCategory category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size // 기본값을 10으로 설정
    ) {
        Page<News> news;
        if (category != null) {
            news = newsService.getNewsByCategory(category, page, size);
        } else {
            news = newsService.getAllNews(page, size);
        }
        return ResponseEntity.ok().body(Message.success(news));
    }
}
