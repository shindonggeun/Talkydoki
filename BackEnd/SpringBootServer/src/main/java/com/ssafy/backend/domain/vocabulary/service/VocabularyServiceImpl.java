package com.ssafy.backend.domain.vocabulary.service;

import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import com.ssafy.backend.domain.vocabulary.dto.PersonalVocabularyInfo;
import com.ssafy.backend.domain.vocabulary.dto.VocabularyInfo;
import com.ssafy.backend.domain.vocabulary.entity.PersonalVocabulary;
import com.ssafy.backend.domain.vocabulary.entity.Vocabulary;
import com.ssafy.backend.domain.vocabulary.exception.VocabularyErrorCode;
import com.ssafy.backend.domain.vocabulary.exception.VocabularyException;
import com.ssafy.backend.domain.vocabulary.repository.PersonalVocabularyRepository;
import com.ssafy.backend.domain.vocabulary.repository.VocabularyRepository;
import com.ssafy.backend.global.common.dto.SliceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class VocabularyServiceImpl implements VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final MemberRepository memberRepository;
    private final PersonalVocabularyRepository personalVocabularyRepository;

    @Override
    @Transactional(readOnly = true)
    public VocabularyInfo getDailyVocabulary() {
        Vocabulary vocabulary = vocabularyRepository.findRandom().orElseThrow(()
        -> new VocabularyException(VocabularyErrorCode.NOT_EXIST_VOCABULARY));

        return VocabularyInfo.builder()
                .id(vocabulary.getId())
                .japanese(vocabulary.getJapanese())
                .japaneseRead(vocabulary.getJapaneseRead())
                .korean(vocabulary.getKorean())
                .type(vocabulary.getType())
                .build();
    }

    @Override
    public void createPersonalVocabulary(Long memberId, Long vocabularyId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        Vocabulary vocabulary = vocabularyRepository.findById(vocabularyId).orElseThrow(()
        -> new VocabularyException(VocabularyErrorCode.NOT_EXIST_VOCABULARY));

        // 이미 나만의 단어장에 추가된 데이터인지 확인하는 로직
        boolean exists = personalVocabularyRepository.existsByMemberAndVocabulary(member, vocabulary);
        if (exists) {
            throw new VocabularyException(VocabularyErrorCode.DUPLICATE_PERSONAL_VOCABULARY);
        }

        PersonalVocabulary personalVocabulary = PersonalVocabulary.builder()
                .member(member)
                .vocabulary(vocabulary)
                .build();

        personalVocabularyRepository.save(personalVocabulary);
    }

    @Override
    public SliceResponse<PersonalVocabularyInfo> getPersonalVocabularyList(Long memberId, Pageable pageable) {
        Slice<PersonalVocabularyInfo> personalVocabularyInfoList = personalVocabularyRepository.findPersonalVocabularyList(memberId, pageable);
        return SliceResponse.of(personalVocabularyInfoList);
    }

    @Override
    public void deletePersonalVocabulary(Long memberId, Long personalVocabularyId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
                -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // 나만의 단어장에서 단어 삭제 권한 검증
        PersonalVocabulary personalVocabulary = personalVocabularyRepository.findById(personalVocabularyId).orElseThrow(()
        -> new VocabularyException(VocabularyErrorCode.NOT_EXIST_PERSONAL_VOCABULARY));

        if (!personalVocabulary.getMember().getId().equals(memberId)) {
            throw new VocabularyException(VocabularyErrorCode.NOT_OWNED_PERSONAL_VOCABULARY);
        }

        personalVocabularyRepository.delete(personalVocabulary);
    }

}
