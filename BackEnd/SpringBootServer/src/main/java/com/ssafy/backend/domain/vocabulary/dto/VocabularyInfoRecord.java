package com.ssafy.backend.domain.vocabulary.dto;

import lombok.Builder;

@Builder
public record VocabularyInfoRecord(
        Long id,
        String japanese,
        String japaneseRead,
        String korean,
        String type
) {
}
