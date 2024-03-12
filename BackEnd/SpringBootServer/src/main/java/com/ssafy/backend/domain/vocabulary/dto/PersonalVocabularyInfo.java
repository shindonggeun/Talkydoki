package com.ssafy.backend.domain.vocabulary.dto;

public record PersonalVocabularyInfo(
        Long personalVocabularyId,
        String japanese,
        String japaneseRead,
        String korean,
        String type
) {
}
