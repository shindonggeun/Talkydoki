package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;
/**
 * GPT와의 대화 요청을 나타내는 레코드입니다.
 * 이 레코드는 GPT-3.5-turbo 모델에 전송될 메시지와 관련 설정을 포함합니다.
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GptChatRequest(
        String model,
        List<GptDialogueMessage> messages,
        int maxTokens
) {
}
