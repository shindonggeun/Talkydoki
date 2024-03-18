package com.ssafy.backend.domain.vocabulary.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import com.ssafy.backend.domain.vocabulary.entity.QPersonalVocabulary;
import com.ssafy.backend.domain.vocabulary.entity.QVocabulary;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PersonalVocabularyRepositoryCustomImpl implements PersonalVocabularyRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<PersonalVocabularyInfo> findPersonalVocabularyList(Long memberId, Pageable pageable) {
        // 단어장과 나만의 단어장에 대한 Querydsl의 Q 타입 인스턴스를 생성합니다.
        QVocabulary qVocabulary = QVocabulary.vocabulary;
        QPersonalVocabulary qPersonalVocabulary = QPersonalVocabulary.personalVocabulary;

        // 해당 회원의 나만의 단어장 목록을 조회하는 Querydsl 쿼리를 작성하여 결과 목록을 가져옵니다.
        List<PersonalVocabularyInfo> personalVocabularyInfoList = queryFactory
                .select(Projections.bean(
                        PersonalVocabularyInfo.class,
                        qPersonalVocabulary.id.as("personalVocabularyId"),
                        qVocabulary.japanese,
                        qVocabulary.japaneseRead,
                        qVocabulary.korean,
                        qVocabulary.type
                ))
                .from(qPersonalVocabulary)
                .leftJoin(qPersonalVocabulary.vocabulary, qVocabulary)
                .where(qPersonalVocabulary.member.id.eq(memberId))
                .orderBy(qPersonalVocabulary.id.asc())
                .offset(pageable.getOffset()) // 페이지의 시작 위치를 설정
                .limit(pageable.getPageSize() + 1)  // 다음 페이지 존재 여부 확인을 위해 +1
                .fetch();

        return new SliceImpl<>(personalVocabularyInfoList, pageable, hasNext(personalVocabularyInfoList, pageable.getPageSize()));
    }

    // 결과 목록의 크기가 요청된 페이지 크기보다 큰 경우 마지막 항목을 제거하고 true를 반환하여 다음 페이지가 있음을 나타냅니다.
    private boolean hasNext(List<?> contents, int limit) {
        boolean hasNext = contents.size() > limit;
        if (hasNext) {
            contents.remove(limit);
        }
        return hasNext;
    }
}
