package com.ssafy.backend.domain.aichat.entity;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AiChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne
    @JoinColumn
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AiChatCategory category;

    @OneToMany(mappedBy = "aiChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AiChatHistory> aiChatHistories = new ArrayList<>();

    @OneToOne(mappedBy = "aiChatRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private AiChatReport aiChatReport;
}
