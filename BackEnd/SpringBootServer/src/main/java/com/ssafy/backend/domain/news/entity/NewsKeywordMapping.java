package com.ssafy.backend.domain.news.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class NewsKeywordMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    private Float weight;

    @ManyToOne
    @JoinColumn(name = "news_id")
    private News news;

    @ManyToOne
    @JoinColumn(name = "keyword_id")
    private Keyword keyword;
}
