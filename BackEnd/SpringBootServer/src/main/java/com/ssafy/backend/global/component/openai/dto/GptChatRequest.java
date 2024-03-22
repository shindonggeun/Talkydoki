package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import java.util.List;
import java.util.Map;

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
    /**
     * AiChatMessage 객체를 GPT와의 대화 요청으로 변환합니다.
     *
     * @param aiChatMessage 사용자의 메시지를 포함하는 AiChatMessage 객체
     * @return GptChatRequest 객체
     */
    public static GptChatRequest from(AiChatMessage aiChatMessage) {

        return new GptChatRequest(
                "gpt-3.5-turbo-1106",
                List.of(new GptDialogueMessage("user", aiChatMessage.content())),
                150
        );
    }
}
