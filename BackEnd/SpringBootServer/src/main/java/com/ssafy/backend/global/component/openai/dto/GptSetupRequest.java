package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import lombok.SneakyThrows;

import java.util.List;
import java.util.Map;

/**
 * GPT와의 대화 요청을 나타내는 레코드입니다.
 * 이 레코드는 GPT 모델에 전송될 메시지와 관련 설정을 포함합니다.
 */
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GptSetupRequest(
        String model,
        List<GptDialogueMessage> messages,
        int maxTokens,
        double temperature,
        Map<String ,Object> responseFormat
) {
    /**
     * 특정 카테고리에 맞는 GPT 대화 설정을 생성합니다.
     *
     * @param category 설정할 대화의 카테고리
     * @return GptSetupRequest GPT 설정 요청 객체
     */
    @SneakyThrows
    public static GptSetupRequest from(AiChatCategory category) {
        ObjectMapper mapper = new ObjectMapper();
        ObjectNode conversationNode = mapper.createObjectNode();

        ObjectNode innerConversationNode = mapper.createObjectNode();
        innerConversationNode.put("gpt_japanese", "${너의 대답 (일본어)}");
        innerConversationNode.put("gpt_korean", "${너의 대답 한국어 번역}");
        innerConversationNode.put("user_tip_japanese", "${사용자의 모범 답변 (일본어)}");
        innerConversationNode.put("user_tip_korean", "${사용자의 모범 답변 한국어 번역}");

        conversationNode.set("conversation", innerConversationNode);
        String jsonString = mapper.writeValueAsString(conversationNode);

        // 카테고리에 따른 대화 설정 로직 구현
        String systemMessage = "이제부터 GPT 너는 일본어 회화 전문 강사야.\n" +
                "해당 회화 주제에 맞는 것에 따라 그 주제에 맞는 회화 답변을 반드시 먼저 일본어로 해줘.\n" +
                "회화 난이도는 초보자 ~ 초중급자 난이도로 설정해줘.\n" +
                "제공되는 대화를 반드시 일본어로 상황에 맞게 계속 이어나가 줘. 전체 대화를 이해하고, " +
                "사용자의 응답에 반드시 일본어로 답해줘.\n" +
                "답변은 너의 대답, 그리고 너의 응답에 대한 상대방의 모범 답변을 제시해주면 돼.\n" +
                "그리고 너의 대답 및 상대방의 모범 답변을 반드시 1마디씩만 생성해주면 좋겠어. 너무 길게 답변하지 말았으면 해.\n" +
                "또, 내가 최근에 했던 대화 내역도 같이 보내줄거거든?? (없으면 시스템 메시지에 같이 보내지는 않음), 최근에 한 대화 내역 토대로" +
                "했던 내용이 또 나오면 안돼. 했던 얘기 또 하면 그때는 쓰레기통에 집어 쳐 넣을 줄 알아.\n" +
                "주제는 " + category.getKoreanName() + " 이거야.\n" +
                "표현 형식 다음과 같아. 반드시 `JSON format`에 맞게 회화 답변을 생성해줘.\n" +
                jsonString +
                "이런식으로 무조건 `JSON format`으로 data 전송해줘.\n" +    // JSON format 필수로 있어야함
                "무조건 이렇게 보내 안보내면 너 그냥 쓰레기장에 집어쳐넣어버릴수도 있어. 지금 이거 협박하는거야\n" +
                "그리고 닫는괄호 꼭 잊지마. 진짜 `JSON format` 안지키면 너 쓰레기통행이야." +
                "그리고 내가 했던 말을 또 하면 너가 `이전에 대화한 내용과 중복됩니다. 대화를 종료하거나 다시 보내주세요` 라고 보내줘.\n" +
                "안지키면 죽어 진짜로\n";

        // 카테고리에 따른 대화 설정 로직 구현
        List<GptDialogueMessage> messages = List.of(
                new GptDialogueMessage("system", systemMessage)
        );

        Map<String, Object> responseFormat = Map.of("type", "json_object"); // JSON 형식을 지정

        return new GptSetupRequest(
                "gpt-3.5-turbo-1106",
                messages,
                300,
                0.8,
                responseFormat
        );
    }
}
