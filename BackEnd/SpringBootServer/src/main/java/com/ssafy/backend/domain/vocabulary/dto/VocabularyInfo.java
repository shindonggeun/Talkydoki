package com.ssafy.backend.domain.vocabulary.dto;

import lombok.Builder;

@Builder
public record VocabularyInfo(
        Long id,
        String japanese,
        String japaneseRead,
        String korean,
        String type,
        Long personalVocabularyId
) {
}
