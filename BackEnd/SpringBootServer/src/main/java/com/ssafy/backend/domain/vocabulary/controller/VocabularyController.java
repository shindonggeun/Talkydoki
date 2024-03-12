package com.ssafy.backend.domain.vocabulary.controller;

import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;
import com.ssafy.backend.domain.vocabulary.service.VocabularyService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.common.dto.SliceResponse;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "단어장", description = "단어장 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vocabulary")
public class VocabularyController {
    private final VocabularyService vocabularyService;

    @Operation(
            summary = "오늘의 단어",
            description = "메인페이지에 사용할 오늘의 단어를 가져오는 기능입니다."
    )
    @GetMapping("/daily/get")
    public ResponseEntity<Message<VocabularyInfo>> getDailyVocabulary() {
        VocabularyInfo vocabulary = vocabularyService.getDailyVocabulary();
        return ResponseEntity.ok().body(Message.success(vocabulary));
    }

    @Operation(
            summary = "나만의 단어 생성(추가)하기",
            description = "회원이 나만의 단어장을 추가하는 기능입니다."
    )
    @PostMapping("/personal/create/{vocabularyId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> createPersonalVocabulary(@AuthenticationPrincipal MemberLoginActive loginActive, @PathVariable Long vocabularyId) {
        vocabularyService.createPersonalVocabulary(loginActive.id(), vocabularyId);
        return ResponseEntity.ok().body(Message.success());
    }

    @Operation(
            summary = "나만의 단어장 (리스트) 가져오기",
            description = "회원이 나만의 단어장들을 가져오는 기능입니다. 페이지네이션 (offset) 방식이 적용되어 있습니다."
    )
    @GetMapping("/personal/list/get")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<SliceResponse<PersonalVocabularyInfo>>> getListPersonalVocabulary(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                                                    Pageable pageable) {
        SliceResponse<PersonalVocabularyInfo> personalVocabularyInfoList = vocabularyService.getPersonalVocabularyList(loginActive.id(), pageable);
        return ResponseEntity.ok().body(Message.success(personalVocabularyInfoList));
    }

    @DeleteMapping("/personal/delete/{personalVocabularyId}")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<Void>> deletePersonalVocabulary(@AuthenticationPrincipal MemberLoginActive loginActive,
                                                                  @PathVariable Long personalVocabularyId) {
        vocabularyService.deletePersonalVocabulary(loginActive.id(), personalVocabularyId);
        return ResponseEntity.ok().body(Message.success());
    }
}
