package com.ssafy.backend.domain.news.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.news.dto.NewsListInfo;
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
    public Slice<NewsListInfo> findNewsListInfo(NewsCategory category, Pageable pageable) {
        QNews qNews = QNews.news;

        List<NewsListInfo> newsListInfoList = queryFactory
                .select(Projections.bean(
                        NewsListInfo.class,
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
        return new SliceImpl<>(newsListInfoList, pageable, hasNext(newsListInfoList, pageable.getPageSize()));
    }

    private boolean hasNext(List<?> contents, int limit) {
        boolean hasNext = contents.size() > limit;
        if (hasNext) {
            contents.remove(limit);
        }
        return hasNext;
    }
}
