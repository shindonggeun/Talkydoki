package com.ssafy.backend.domain.aichat.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AiChatReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @NonNull
    @OneToOne
    @JoinColumn
    private AiChatRoom aiChatRoom;

    @NonNull
    private String conversationSummary;

    @NonNull
    private Float vocabularyScore;

    @NonNull
    private Float grammarScore;

    @NonNull
    private Float wordScore;

    @NonNull
    private Float fluencyScore;

    @NonNull
    private Float contextScore;
}
