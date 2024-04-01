package com.ssafy.backend.domain.vocabulary.entity;

import com.ssafy.backend.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

/**
 * 사용자마다 고유한 단어장 엔티티를 나타냅니다.
 * 이 엔티티는 단어장 항목을 특정 사용자와 연결합니다.
 * <p>
 * 애노테이션을 사용하여 데이터베이스의 테이블 구조, 관계 및 제약 조건을 지정합니다.
 */
@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED) // JPA 스펙 상 protected 접근 제한자를 가진 기본 생성자를 요구합니다.
@AllArgsConstructor(access = AccessLevel.PROTECTED) // 클래스 외부에서의 직접적인 객체 생성을 제한하기 위해 protected 접근 제한자를 가진 생성자를 제공합니다.
public class PersonalVocabulary {
    /**
     * 고유한 식별자로 사용되는 ID 필드입니다.
     * 데이터베이스에서 자동으로 값을 생성하며, 이 필드는 테이블의 기본 키 역할을 합니다.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    /**
     * 'Member' 엔티티와의 다대일 관계를 설정합니다.
     * 이 필드는 'Member' 테이블과의 외래키 관계를 형성하며,
     * 'member_id'라는 이름의 컬럼에 매핑됩니다.
     * FetchType.LAZY를 설정함으로써, 회원 엔티티의 로딩을 필요할 때까지 지연시킵니다.
     * {@code optional = false} 속성은 이 필드의 값이 항상 존재해야 함을 의미합니다. 즉, null이 될 수 없습니다.
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id")
    private Member member;

    /**
     * 'Vocabulary' 엔티티와의 일대일 관계를 설정합니다.
     * 'vocabulary_id' 컬럼을 통해 'Vocabulary' 엔티티와 연결됩니다.
     * 이 필드는 개인 단어장이 특정 단어에 직접 연결됨을 의미합니다.
     */
    @OneToOne
    @JoinColumn(name = "vocabulary_id")
    private Vocabulary vocabulary;
}
