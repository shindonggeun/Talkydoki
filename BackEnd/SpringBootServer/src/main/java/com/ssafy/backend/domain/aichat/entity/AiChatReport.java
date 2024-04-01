package com.ssafy.backend.domain.aichat.entity;

import com.ssafy.backend.domain.aichat.dto.AiChatReportInfo;
import com.ssafy.backend.global.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AiChatReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @OneToOne
    @JoinColumn(name = "ai_chat_room_id", nullable = false)
    private AiChatRoom aiChatRoom;

    @Column(nullable = false)
    private String conversationSummary;

    @Column(nullable = false)
    private Float vocabularyScore;

    @Column(nullable = false)
    private Float grammarScore;

    @Column(nullable = false)
    private Float wordScore;

    @Column(nullable = false)
    private Float fluencyScore;

    @Column(nullable = false)
    private Float contextScore;


    public static AiChatReportInfo dto(AiChatReport aiChatReport){
        return new AiChatReportInfo(
                aiChatReport.getId(),
                aiChatReport.aiChatRoom.getCategory(),
                aiChatReport.getConversationSummary(),
                aiChatReport.getVocabularyScore(),
                aiChatReport.getGrammarScore(),
                aiChatReport.getWordScore(),
                aiChatReport.getFluencyScore(),
                aiChatReport.getContextScore(),
                aiChatReport.getCreatedAt()
        );
    }
}
