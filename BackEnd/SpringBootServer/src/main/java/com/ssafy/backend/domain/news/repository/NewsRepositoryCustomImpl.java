package com.ssafy.backend.domain.news.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.news.dto.NewsSimplyInfo;
import com.ssafy.backend.domain.news.entity.QNews;
import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * NewsRepositoryCustom 인터페이스의 구현 클래스입니다.
 * QueryDSL을 사용하여 뉴스 데이터에 대한 복잡한 쿼리를 실행합니다.
 */
@Repository
@RequiredArgsConstructor
public class NewsRepositoryCustomImpl implements NewsRepositoryCustom {
    private final JPAQueryFactory queryFactory; // QueryDSL 쿼리 팩토리

    /**
     * {@inheritDoc}
     */
    @Override
    public Slice<NewsSimplyInfo> findNewsListInfoNoOffset(List<NewsCategory> categories, Long lastNewsId, int limit) {
        QNews qNews = QNews.news;   // QNews 엔티티의 인스턴스 생성

        // 카테고리 조건 설정. 카테고리 목록이 비어있지 않은 경우에만 적용됩니다.
        BooleanExpression categoryCondition = categories != null && !categories.isEmpty() ? qNews.category.in(categories) : null;
        // 마지막 뉴스 ID 조건 설정. lastNewsId가 null이 아닐 때만 적용됩니다.
        BooleanExpression lastNewsIdCondition = lastNewsId != null ? qNews.id.lt(lastNewsId) : null;

        // 뉴스 조회 쿼리 실행
        List<NewsSimplyInfo> newsSimplyInfoList = queryFactory
                .select(Projections.bean(
                        NewsSimplyInfo.class,
                        qNews.id.as("newsId"),
                        qNews.title,
                        qNews.titleTranslated,
                        qNews.category,
                        qNews.writeDate,
                        qNews.srcOrigin
                ))
                .from(qNews)
                .where(categoryCondition, lastNewsIdCondition)  // 조건 적용
                .orderBy(qNews.writeDate.desc(), qNews.id.desc()) // 먼저 writeDate로 내림차순, 같은 날짜면 id로 내림차순
                .limit(limit + 1)  // 'hasNext' 확인을 위해 'limit + 1'로 설정
                .fetch();

        // 'hasNext'를 계산하기 위해 리스트의 크기가 'limit'보다 큰지 확인 (다음 페이지 존재 여부 확인)
        boolean hasNext = hasNext(newsSimplyInfoList, limit);

        // 'hasNext'가 true인 경우 마지막 항목을 제거
        if (hasNext) {
            newsSimplyInfoList.remove(newsSimplyInfoList.size() - 1);
        }

        // 결과와 'hasNext'를 이용해 Slice 객체 생성 후 반환
        return new SliceImpl<>(newsSimplyInfoList, Pageable.unpaged(), hasNext);
    }

    /**
     * 조회 결과 리스트에서 다음 페이지 유무를 확인합니다.
     * @param contents 조회된 콘텐츠 리스트
     * @param limit 페이지당 항목 수
     * @return 다음 페이지 존재 여부. true일 경우 다음 페이지가 있음을 의미합니다.
     */
    private boolean hasNext(List<?> contents, int limit) {
        // 리스트의 크기가 'limit + 1'과 같다면 다음 페이지가 존재한다는 것을 의미
        boolean hasNext = contents.size() > limit;
        if (hasNext) {
            // 마지막 항목은 실제 페이지에 표시되지 않으므로 제거
            contents.remove(contents.size() - 1);
        }
        return hasNext;
    }
}
