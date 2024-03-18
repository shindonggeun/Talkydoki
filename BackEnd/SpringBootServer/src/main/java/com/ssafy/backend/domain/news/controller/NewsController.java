package com.ssafy.backend.domain.news.controller;

import com.ssafy.backend.domain.news.dto.NewsListInfo;
import com.ssafy.backend.domain.news.dto.NewsPostRequest;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import com.ssafy.backend.domain.news.service.NewsService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.common.dto.SliceResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
            summary = "전체 뉴스 리스트 불러오기",
            description = "전체 뉴스 리스트 정보를 불러오는 기능입니다. 페이지네이션 (offset) 방식이 적용되어 있습니다."
    )
    @GetMapping("/list/get")
    public ResponseEntity<Message<SliceResponse<NewsListInfo>>> getListNews(
            @RequestParam(required = false) NewsCategory category,
            Pageable pageable
    ) {
        SliceResponse<NewsListInfo> newsListInfo = newsService.getNewsByCategory(category, pageable);
        return ResponseEntity.ok().body(Message.success(newsListInfo));
    }
}
