package com.ssafy.backend.domain.vocabulary.service;

import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;
import com.ssafy.backend.global.common.dto.SliceResponse;
import org.springframework.data.domain.Pageable;

public interface VocabularyService {

    // 오늘의 단어 가져오기
    VocabularyInfo getDailyVocabulary(Long memberId);

    // 나만의 단어장에 해당 단어 추가하기
    void createPersonalVocabulary(Long memberId, Long vocabularyId);

    // 나만의 단어장 가져오기 (페이지네이션 적용 - offset 방식)
    SliceResponse<PersonalVocabularyInfo> getPersonalVocabularyList(Long memberId, Pageable pageable);

    // 나만의 단어장에서 해당 단어 삭제하기
    void deletePersonalVocabulary(Long memberId, Long personalVocabularyId);

    // 해당 단어 검색하기 (뉴스 기사에 사용)
    VocabularyInfo searchVocabulary(Long memberId, String japanese);
}
