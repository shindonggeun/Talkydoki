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

    // 단어사전에서 일본어 단어로 검색하되, 가장 높은 ID를 가진 항목만 반환
    @Query(value = "SELECT * FROM vocabulary WHERE japanese = ?1 ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<Vocabulary> findByJapanese(String japanese);
}
