package com.ssafy.backend.domain.vocabulary.service;

import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;
import com.ssafy.backend.global.common.dto.SliceResponse;
import org.springframework.data.domain.Pageable;

public interface VocabularyService {
    VocabularyInfo getDailyVocabulary();

    void createPersonalVocabulary(Long memberId, Long vocabularyId);

    SliceResponse<PersonalVocabularyInfo> getPersonalVocabularyList(Long memberId, Pageable pageable);
}
