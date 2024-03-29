package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;

import java.util.ArrayList;
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
    public static GptChatRequest fromAiChatHistories(List<AiChatHistory> conversation) {
        String systemMessage = "당신은 10년 경력의 일본어 전문 강사로서, 학생의 일본어 대화 능력을 평가하고 개선할 방법을 제안하는 임무를 맡고 있습니다. 평가는 대화의 내용을 기반으로 하며,  여기서 중요한 점은 오직 \"user\" 역할을 가진 메시지만 분석 대상임을 명심해야 합니다. 'role'이 \"assistant\" 역할의 메시지는 분석에서 제외하고, \"user\" 메시지에 대한 어휘력, 문법, 유창성 등을 평가해 주세요. 그리고 마찬가지로 'role'이 \"user\"인 메세지에 대해서만 피드백을 자세히 제공해주세요.(잘했으면 왜 잘했는지도 말해주기)\n" +"평가는 다음과 같은 기준에 따라 진행됩니다:\n\n"
                +"하나씩 하나씩 파악해 봅시다.\n"
                + "1. 어휘력: 사용된 어휘의 다양성, 정확성, 상황에 맞는 적절성을 평가합니다.\n"
                + "2. 단어 점수: 단어 선택의 적합성과 맞춤법 정확도를 평가합니다.\n"
                + "3. 유창성: 문장의 자연스러움과 문장 간의 연결을 평가합니다.\n"
                + "4. 문법: 문법 규칙의 정확한 사용과 문장 구조를 평가합니다.\n"
                + "5. 문맥 이해: 대화의 주제와 상황에 대한 이해도 및 의도의 명확성을 평가합니다.\n\n"
                +"\"assistant\" 역할의 메시지는 평가 대상에서 제외하고, 오직 \"user\" 역할을 가진 메시지만 분석하여 다음 정보를 제공해 주세요:\n\n"
                + "각 항목의 평가 점수는 1에서 5 사이의 값으로, 소수점 두 자리까지 표현됩니다. 대화 내용 분석 후, 반드시 아래의 JSON 형식에 맞추어(예외는 없습니다. 그렇지 않으면 당신을 해고할 것입니다.) 평가 결과와 피드백을 제공해 주세요.:\n\n"
                + "{\n"
                + "  \"conversationSummary\": \"여기에 대화 내용의 요약을 작성합니다.\",\n"
                + "  \"vocabularyScore\": 3.25,\n"
                + "  \"wordScore\": 3.75,\n"
                + "  \"fluencyScore\": 4.00,\n"
                + "  \"grammarScore\": 3.50,\n"
                + "  \"contextScore\": 4.20,\n"
                + "  \"feedbacks\": [\n"
                + "    {\n"
                + "      \"chatId\": <int>,\n"
                + "      \"content\": \"여기에 대화 <chatId> 에 대한 피드백을 작성합니다. 예: '어휘 선택이 더 다양할 수 있습니다. '猫が好きです' 대신 '私は猫を愛しています'라고 표현할 수 있습니다.'\"\n"
                + "    },\n"
                + "    {\n"
                + "      \"chatId\": <int>,\n"
                + "      \"content\": \"여기에 대화 <chatId>에 대한 피드백을 작성합니다.\"\n"
                + "    }\n"
                + "  ]\n"
                + "}\n\n";

        ArrayList<GptDialogueMessage> messageList = new ArrayList<>();
        messageList.add(new GptDialogueMessage("system", systemMessage));

        for (AiChatHistory chatHistory: conversation) {
            String role = switch (chatHistory.getSender()) {
                case GPT -> "assistant";
                case USER -> "user";
                default -> null;
            };

            if (role != null) {
                String chatId = String.valueOf(chatHistory.getId());
                String content = chatHistory.getContent();
                messageList.add(new GptDialogueMessage(role, content));
            }
        }

        int tokenSize = calculateMaxToken(messageList.size());
        return new GptChatRequest("gpt-3.5-turbo", messageList, tokenSize);
    }

    private static int calculateMaxToken(int messageCount) {
        // tokenSize 계산 로직 유지 및 필요에 따라 수정
        if (messageCount <= 10) return 1500;
        else if (messageCount <= 30) return 2500;
        else if (messageCount <= 45) return 3000;
        else throw new RuntimeException("Conversation's too long to service.");
    }
}
