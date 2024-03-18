package com.ssafy.backend.domain.news.controller;

import com.ssafy.backend.domain.news.entity.News;
import com.ssafy.backend.domain.news.service.NewsHadoopService;
import com.ssafy.backend.global.common.dto.Message;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "하둡 뉴스", description = "하둡 뉴스 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/hadoop/news")
public class NewsHadoopController {
    private final NewsHadoopService newsHadoopService;
    @Operation(
            summary = "전체 뉴스 불러오기",
            description = "전체 뉴스 정보를 불러오는 기능입니다."
    )
    @GetMapping("/get")
    public ResponseEntity<Message<List<News>>> getALLNews() {
        List<News> news;
            news = newsHadoopService.getAllNews();
        return ResponseEntity.ok().body(Message.success(news));
    }
}
