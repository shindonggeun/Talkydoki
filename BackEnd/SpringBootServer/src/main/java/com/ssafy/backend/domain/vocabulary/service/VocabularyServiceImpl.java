package com.ssafy.backend.domain.vocabulary.service;

import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;
import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import com.ssafy.backend.domain.vocabulary.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {

    private final VocabularyRepository vocabularyRepository;

    @Override
    @Transactional(readOnly = true)
    public VocabularyInfo getDailyVocabulary() {
        Vocabulary vocabulary = vocabularyRepository.findRandom().orElseThrow(()
        -> new RuntimeException("단어장 데이터가 없습니다."));

        return VocabularyInfo.builder()
                .id(vocabulary.getId())
                .japanese(vocabulary.getJapanese())
                .japaneseRead(vocabulary.getJapaneseRead())
                .korean(vocabulary.getKorean())
                .type(vocabulary.getType())
                .build();
    }

}
