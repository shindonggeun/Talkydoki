package com.ssafy.backend.domain.aichat.entity;

import com.ssafy.backend.domain.aichat.entity.enums.Sender;
import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class AiChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn
    private AiChatRoom aiChatRoom;

    @Enumerated(EnumType.STRING)
    @NonNull
    private Sender sender;

    @NonNull
    private String content;

    @NonNull
    @ManyToOne
    @JoinColumn
    private Member member;


}
