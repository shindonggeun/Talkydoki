package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalVocabularyRepository extends JpaRepository<PersonalVocabulary, Long> {
    boolean existsByMemberAndVocabulary(Member member, Vocabulary vocabulary);
}
