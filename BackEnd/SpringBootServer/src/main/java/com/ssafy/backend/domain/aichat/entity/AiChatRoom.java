package com.ssafy.backend.domain.aichat.entity;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

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


    @NonNull
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @ManyToOne
    @JoinColumn
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AiChatCategory category;

//    @Builder.Default
//    @Column(nullable=false, columnDefinition = "boolean default false")
//    private Boolean isDone = false;

}
