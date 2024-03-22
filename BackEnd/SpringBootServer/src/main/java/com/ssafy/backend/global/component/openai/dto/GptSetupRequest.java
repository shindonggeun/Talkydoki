package com.ssafy.backend.global.component.openai.dto;

import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;

import java.util.List;

/**
 * GPT와의 대화 요청을 나타내는 레코드입니다.
 * 이 레코드는 GPT 모델에 전송될 메시지와 관련 설정을 포함합니다.
 */
public record GptSetupRequest(
        String model,
        List<GptDialogueMessage> messages,
        int maxTokens
) {
    /**
     * 특정 카테고리에 맞는 GPT 대화 설정을 생성합니다.
     *
     * @param category 설정할 대화의 카테고리
     * @return GptSetupRequest GPT 설정 요청 객체
     */
    public static GptSetupRequest from(AiChatCategory category) {
        // 카테고리에 따른 대화 설정 로직 구현
        String systemMessage = "당신은 일본어 회화 전문 강사입니다.\n" +
                "제공되는 대화를 일본어로 상황에 맞게 계속 이어나가 주세요. 전체 대화를 이해하고, " +
                "마지막 사용자의 응답에 반드시 일본어로 답해주세요.\n" +
                "답변은 당신의 대답, 그리고 당신의 대답에 대한 상대방의 예상 반응을 제시해주면 됩니다.\n" +
                "주제는 " + category.getKoreanName() + " 입니다.\n" +
                "표현 형식 다음과 같습니다. 반드시 다음 양식에 맞게 답변을 생성해주세요.\n" +
                "[양식] : '\"GPT':<당신의 대답>\n'USER':<사용자의 모범 답변>\n\n" +
                "이제 대화 내용을 제공해 드리겠습니다.";

        // 카테고리에 따른 대화 설정 로직 구현
        List<GptDialogueMessage> messages = List.of(
                new GptDialogueMessage("system", systemMessage)
        );

        return new GptSetupRequest(
                "gpt-3.5-turbo",
                messages,
                100
        );
    }
}
