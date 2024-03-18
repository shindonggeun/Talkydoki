package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.member.dto.MemberUpdateRequest;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.domain.news.entity.NewsKeywordHistory;
import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import com.ssafy.backend.global.common.entity.BaseEntity;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false)
    private String email;

    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String nickname;

    private String profileImage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole role;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private OAuthDomain oAuthDomain;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE)
    private List<PersonalVocabulary> personalVocabularies = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<NewsKeywordHistory> newsKeywordHistories = new ArrayList<>();

    public void updateProfileImageAndNickname(MemberUpdateRequest updateRequest) {
        this.nickname = updateRequest.nickname();
        this.profileImage = updateRequest.profileImage();
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
