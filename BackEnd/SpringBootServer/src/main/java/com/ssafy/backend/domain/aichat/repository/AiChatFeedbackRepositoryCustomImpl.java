package com.ssafy.backend.domain.aichat.repository;

import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.aichat.dto.AiChatAndFeedbackInfo;
import com.ssafy.backend.domain.aichat.entity.QAiChatFeedback;
import com.ssafy.backend.domain.aichat.entity.QAiChatHistory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class AiChatFeedbackRepositoryCustomImpl implements AiChatFeedbackRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<AiChatAndFeedbackInfo> getAiChatFeedbackInfo(Long roomId) {
        QAiChatHistory qAiChatHistory = QAiChatHistory.aiChatHistory;
        QAiChatFeedback qAiChatFeedback = QAiChatFeedback.aiChatFeedback;

        // 급한대로 gpt의 피드백도 생기는 오류를
        // 아래 분기를 통해 해결
        return queryFactory
                .select(
                        qAiChatHistory.id, // 이 부분은 chatId를 나타내며, AiChatHistory의 ID를 참조합니다.
                        qAiChatHistory.sender, // sender에 해당
                        qAiChatHistory.content, // message에 해당
                        new CaseBuilder()
                                .when(qAiChatHistory.sender.eq(AiChatSender.GPT)) // sender가 GPT enum 값과 동일한 경우
                                .then(Expressions.stringTemplate("CAST(NULL AS java.lang.String)")) // feedback을 null로 설정
                                .otherwise(qAiChatFeedback.content) // 그렇지 않으면 실제 feedback 내용 사용
                )
                .from(qAiChatHistory)
                .leftJoin(qAiChatFeedback).on(qAiChatHistory.id.eq(qAiChatFeedback.aiChatHistory.id))
                .where(qAiChatHistory.aiChatRoom.id.eq(roomId)) // roomId를 기준으로 필터링
                .fetch()
                .stream()
                .map(tuple -> new AiChatAndFeedbackInfo(
                        tuple.get(qAiChatHistory.id),
                        tuple.get(qAiChatHistory.sender),
                        tuple.get(qAiChatHistory.content),
                        tuple.get(3, String.class) // feedback에 해당하는 값 처리
                ))
                .toList();
    }

}
