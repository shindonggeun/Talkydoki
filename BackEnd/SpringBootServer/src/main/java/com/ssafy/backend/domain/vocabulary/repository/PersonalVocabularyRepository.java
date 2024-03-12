package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalVocabularyRepository extends JpaRepository<PersonalVocabulary, Long> {
}
