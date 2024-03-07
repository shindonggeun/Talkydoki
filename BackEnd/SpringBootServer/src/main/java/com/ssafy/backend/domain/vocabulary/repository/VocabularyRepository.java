package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
}
