package com.ssafy.backend.domain.news.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.backend.domain.news.entity.enums.NewsCategory;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NewsCategory category;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String summary;

    @Column(updatable = false, nullable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime writeDate;

    @Column(nullable = false)
    private String srcOrigin;

    @OneToMany(mappedBy = "news", fetch = FetchType.EAGER)
    private List<NewsKeywordMapping> newsKeywordMappings = new ArrayList<>();

    @OneToOne(mappedBy = "news")
    private NewsShadowing newsShadowing;
}
