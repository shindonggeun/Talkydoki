package com.ssafy.backend.domain.vocabulary.entity;

import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class Vocabulary extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String japanese;

    @Column(nullable = false, columnDefinition = "VARCHAR(200)")
    private String korean;

    @Column(nullable = false, columnDefinition = "VARCHAR(50)")
    private String japaneseRead;

    @Column(columnDefinition = "VARCHAR(50)")
    private String type;
}
