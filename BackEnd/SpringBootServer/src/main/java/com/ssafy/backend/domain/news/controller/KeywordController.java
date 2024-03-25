package com.ssafy.backend.domain.news.controller;

import com.ssafy.backend.domain.news.dto.KeywordMappingRequest;
import com.ssafy.backend.domain.news.dto.KeywordPostRequest;
import com.ssafy.backend.domain.news.entity.NewsKeywordMapping;
import com.ssafy.backend.domain.news.service.KeywordService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;

@Tag(name = "뉴스 키워드", description = "뉴스 키워드 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/keywords")
public class KeywordController {
    private final KeywordService keywordService;

    @Operation(
            summary = "일본어 키워드 저장",
            description = "DB에 일본어 키워드를 저장하는 기능입니다.")
    @PostMapping("/post")
    public ResponseEntity<Message<Void>> insertKeyword(@Valid @RequestBody KeywordPostRequest keywordPostRequest) {
        keywordService.insertKeyword(keywordPostRequest);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "키워드 가중치 저장",
            description = "DB에 해당 뉴스 - 단어의 가중치를 저장하는 기능입니다.")
    @PostMapping("/weight")
    public ResponseEntity<Message<Void>> insertWeight(@Valid @RequestBody KeywordMappingRequest keywordMappingRequest) {
        keywordService.insertWeight(keywordMappingRequest);
        return ResponseEntity.ok().body(Message.success());
    }
}
