package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PersonalVocabularyRepositoryCustom {
    Slice<PersonalVocabularyInfo> findPersonalVocabularyList(Long memberId, Pageable pageable);
}
