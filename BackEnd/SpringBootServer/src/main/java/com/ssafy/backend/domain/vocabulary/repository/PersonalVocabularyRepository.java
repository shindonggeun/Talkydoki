package com.ssafy.backend.domain.vocabulary.repository;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;



@Repository
public interface PersonalVocabularyRepository extends JpaRepository<PersonalVocabulary, Long>, PersonalVocabularyRepositoryCustom {
    boolean existsByMemberAndVocabulary(Member member, Vocabulary vocabulary);

    @Modifying
    @Query("delete from PersonalVocabulary pv where pv.id = :personalVocabularyId and pv.member.id = :memberId")
    int deleteByIdAndMemberId(Long personalVocabularyId, Long memberId);

    PersonalVocabulary findByMemberAndVocabulary(Member member, Vocabulary vocabulary);
}
