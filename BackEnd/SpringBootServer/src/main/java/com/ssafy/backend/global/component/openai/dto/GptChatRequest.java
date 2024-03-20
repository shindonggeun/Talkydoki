package com.ssafy.backend.global.component.openai.dto;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import java.util.List;

/**
 * GPT와의 대화 요청을 나타내는 레코드입니다.
 * 이 레코드는 GPT-3.5-turbo 모델에 전송될 메시지와 관련 설정을 포함합니다.
 */
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
                "gpt-3.5-turbo",
                List.of(new GptDialogueMessage("user", aiChatMessage.content())),
                30
        );
    }
}
