package com.ssafy.backend.domain.aichat.entity;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class AiChatFeedback {
    @Id
    @Column(columnDefinition = "INT UNSIGNED")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "ai_chat_history_id") // nullable = false?
    private AiChatHistory aiChatHistory;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;
}
