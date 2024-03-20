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

@Repository
@RequiredArgsConstructor
public class NewsRepositoryCustomImpl implements NewsRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<NewsSimplyInfo> findNewsListInfo(NewsCategory category, Pageable pageable) {
        QNews qNews = QNews.news;

        List<NewsSimplyInfo> newsListInfoSimply = queryFactory
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
                .where(qNews.category.eq(category))
                .orderBy(qNews.writeDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();
        return new SliceImpl<>(newsListInfoSimply, pageable, hasNext(newsListInfoSimply, pageable.getPageSize()));
    }

    @Override
    public Slice<NewsSimplyInfo> findNewsListInfoNoOffset(List<NewsCategory> categories, Long lastNewsId, int limit) {
        QNews qNews = QNews.news;

        // 여러 카테고리에 대한 조건을 처리합니다.
        BooleanExpression categoryCondition = null;
        if (categories != null && !categories.isEmpty()) {
            categoryCondition = qNews.category.in(categories);
        }

        BooleanExpression lastNewsIdCondition = lastNewsId != null ? qNews.id.lt(lastNewsId) : null;

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
                .where(categoryCondition, lastNewsIdCondition)
                .orderBy(qNews.id.asc())
                .limit(limit + 1)  // 'limit + 1'을 사용하여 'hasNext'를 확인
                .fetch();

        // 'hasNext'를 계산하기 위해 리스트의 크기가 'limit'보다 큰지 확인
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
     * @return 다음 페이지 존재 여부
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
