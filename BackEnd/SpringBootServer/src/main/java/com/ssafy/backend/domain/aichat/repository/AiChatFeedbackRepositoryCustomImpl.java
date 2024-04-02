package com.ssafy.backend.domain.aichat.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.aichat.dto.AiChatAndFeedbackInfo;
import com.ssafy.backend.domain.aichat.entity.QAiChatFeedback;
import com.ssafy.backend.domain.aichat.entity.QAiChatHistory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Repository
public class AiChatFeedbackRepositoryCustomImpl implements AiChatFeedbackRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<AiChatAndFeedbackInfo> getAiChatFeedbackInfo(Long roomId) {
        QAiChatHistory qAiChatHistory = QAiChatHistory.aiChatHistory;
        QAiChatFeedback qAiChatFeedback = QAiChatFeedback.aiChatFeedback;

        // 사용자의 첫 메시지 ID를 찾습니다.
        Long firstUserMessageId = queryFactory
                .select(qAiChatHistory.id.min())
                .from(qAiChatHistory)
                .where(qAiChatHistory.aiChatRoom.id.eq(roomId),
                        qAiChatHistory.sender.eq(AiChatSender.USER))
                .fetchOne();

        // firstUserMessageId 이전의 마지막 GPT 메시지 ID를 찾습니다.
        Long lastGptMessageIdBeforeFirstUser = queryFactory
                .select(qAiChatHistory.id.max())
                .from(qAiChatHistory)
                .where(qAiChatHistory.aiChatRoom.id.eq(roomId),
                        qAiChatHistory.sender.eq(AiChatSender.GPT),
                        qAiChatHistory.id.lt(firstUserMessageId))
                .fetchOne();

        // lastGptMessageIdBeforeFirstUser 이후의 모든 메시지를 가져옵니다.
        List<Tuple> results = queryFactory
                .select(
                        qAiChatHistory.id,
                        qAiChatHistory.sender,
                        qAiChatHistory.content,
                        new CaseBuilder()
                                .when(qAiChatHistory.sender.eq(AiChatSender.USER))
                                .then(qAiChatFeedback.content)
                                .otherwise(Expressions.stringTemplate("CAST(NULL AS java.lang.String)"))
                )
                .from(qAiChatHistory)
                .leftJoin(qAiChatFeedback).on(qAiChatHistory.id.eq(qAiChatFeedback.aiChatHistory.id))
                .where(qAiChatHistory.aiChatRoom.id.eq(roomId),
                        qAiChatHistory.id.goe(lastGptMessageIdBeforeFirstUser)) // ID가 lastGptMessageIdBeforeFirstUser 이상인 경우
                .orderBy(qAiChatHistory.id.asc())
                .fetch();

        return results.stream()
                .map(tuple -> new AiChatAndFeedbackInfo(
                        tuple.get(qAiChatHistory.id),
                        tuple.get(qAiChatHistory.sender),
                        tuple.get(qAiChatHistory.content),
                        tuple.get(3, String.class) // CaseBuilder에 의해 결정되는 부분입니다.
                ))
                .collect(Collectors.toList());
    }

}
