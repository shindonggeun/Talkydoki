package com.ssafy.backend.domain.vocabulary.service;

import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;

public interface VocabularyService {
    VocabularyInfo getDailyVocabulary();

    void createPersonalVocabulary(Long memberId, Long vocabularyId);
}
