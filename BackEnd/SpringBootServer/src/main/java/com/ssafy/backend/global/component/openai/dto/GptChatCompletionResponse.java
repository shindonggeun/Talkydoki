package com.ssafy.backend.global.component.openai.dto;

import java.util.List;

/**
 * GPT 대화 완료 응답을 나타내는 클래스입니다.
 */
public record GptChatCompletionResponse(List<Choice> choices) {

    /**
     * GPT 응답에서의 선택지를 나타내는 레코드입니다.
     */
    public record Choice(int index, GptDialogueMessage message) {}
}
