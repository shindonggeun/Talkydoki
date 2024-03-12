package com.ssafy.backend.domain.vocabulary.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalVocabularyInfo {
    Long personalVocabularyId;
    String japanese;
    String japaneseRead;
    String korean;
    String type;
}
