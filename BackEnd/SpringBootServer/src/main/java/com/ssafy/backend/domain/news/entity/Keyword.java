package com.ssafy.backend.domain.news.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class Keyword {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false)
    private String japanese;

    private String korean;

    @OneToMany(mappedBy = "keyword")
    private List<NewsKeywordMapping> newsKeywordMappings = new ArrayList<>();

    @OneToMany(mappedBy = "keyword")
    private List<NewsKeywordHistory> newsKeywordHistories = new ArrayList<>();
}
