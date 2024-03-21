package com.ssafy.backend.domain.member.entity;

import com.ssafy.backend.domain.member.dto.MemberUpdateRequest;
import com.ssafy.backend.domain.member.entity.enums.MemberRole;
import com.ssafy.backend.domain.news.entity.NewsKeywordHistory;
import com.ssafy.backend.domain.news.entity.NewsShadowing;
import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import com.ssafy.backend.global.common.entity.BaseEntity;
import com.ssafy.backend.global.component.oauth.vendor.enums.OAuthDomain;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 회원 도메인의 핵심 엔티티입니다. 이 엔티티는 회원의 기본 정보, 인증 정보, 그리고 관련 도메인에 대한 연관관계를 정의합니다.
 * BaseEntity를 상속받아 공통적인 생성 및 수정 시간을 관리합니다.
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    /**
     * 회원의 고유 식별자입니다. 자동으로 생성되며, 데이터베이스에서 유니크한 값으로 관리됩니다.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id; // 회원의 고유 식별자입니다.

    /**
     * 회원의 이메일 주소로, 로그인 시 사용되는 중요한 인증 정보입니다. null을 허용하지 않습니다.
     */
    @Column(nullable = false)
    private String email;

    /**
     * 회원의 비밀번호로, 인증 시 사용됩니다. 암호화하여 저장해야 하는 필드입니다.
     */
    private String password;

    /**
     * 회원의 실명으로, 개인을 식별하는 데 사용됩니다. null을 허용하지 않습니다.
     */
    @Column(nullable = false)
    private String name;

    /**
     * 회원의 닉네임으로, 사이트 내에서 사용자를 대표하는 이름입니다. null을 허용하지 않습니다.
     */
    @Column(nullable = false)
    private String nickname;

    /**
     * 회원의 프로필 이미지 경로로, 사용자의 프로필 페이지 등에서 사용됩니다.
     */
    private String profileImage;

    /**
     * 회원의 역할을 정의합니다. 사용 가능한 역할은 MemberRole enum에 정의되어 있습니다.
     * 예를 들어 USER, ADMIN 등이 있으며, null을 허용하지 않습니다.
     */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole role;

    /**
     * 소셜 로그인 제공자 정보로, OAuthDomain enum에 정의된 값 중 하나를 사용합니다.
     * 예를 들어 KAKAO, NAVER 등이 있습니다.
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private OAuthDomain oAuthDomain;

    /**
     * 회원이 생성한 나만의 단어장 목록과의 일대다 관계를 정의합니다.
     * 회원이 삭제되면 해당 회원이 생성한 모든 나만의 단어장들이 함께 삭제됩니다. (cascade = CascadeType.ALL, orphanRemoval = true)
     */
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PersonalVocabulary> personalVocabularies = new ArrayList<>();

    /**
     * 회원이 조회한 뉴스 키워드(핵심 단어) 히스토리 목록과의 일대다 관계를 정의합니다.
     * 회원이 삭제되면 조회한 모든 뉴스 키워드 히스토리도 함께 삭제됩니다. (cascade = CascadeType.ALL, orphanRemoval = true)
     */
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsKeywordHistory> newsKeywordHistories = new ArrayList<>();

    /**
     * 회원과 관련된 회화 평가에 사용되는 뉴스 쉐도잉 연습 기록 목록과의 일대다 관계를 정의합니다.
     * 회원이 삭제되면 관련된 모든 뉴스 쉐도잉 기록도 함께 삭제됩니다. (cascade = CascadeType.ALL, orphanRemoval = true)
     */
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NewsShadowing> newsShadowing = new ArrayList<>();

    /**
     * 회원의 프로필 이미지와 닉네임을 업데이트합니다.
     *
     * @param updateRequest 닉네임과 프로필 이미지 정보가 담긴 DTO 객체
     */
    public void updateProfileImageAndNickname(MemberUpdateRequest updateRequest) {
        this.nickname = updateRequest.nickname();
        this.profileImage = updateRequest.profileImage();
    }

    /**
     * 회원의 비밀번호를 업데이트합니다.
     *
     * @param password 새로 설정할 비밀번호
     */
    public void updatePassword(String password) {
        this.password = password;
    }
}
