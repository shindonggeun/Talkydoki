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

    @ManyToOne
    @JoinColumn(name = "ai_chat_room_id")
    private AiChatRoom aiChatRoom;

    @OneToOne
    @JoinColumn(name = "ai_chat_history_id") // nullable = false?
    private AiChatHistory aiChatHistory;

    @Column(nullable = false)
    private String content;
}
