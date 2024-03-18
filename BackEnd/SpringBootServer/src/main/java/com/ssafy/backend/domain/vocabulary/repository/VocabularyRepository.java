package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
    @Query(value = "SELECT * FROM vocabulary ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Optional<Vocabulary> findRandom();

    // 단어사전에서 일본어 단어로 검색하기
    Optional<Vocabulary> findByJapanese(String japanese);
}
