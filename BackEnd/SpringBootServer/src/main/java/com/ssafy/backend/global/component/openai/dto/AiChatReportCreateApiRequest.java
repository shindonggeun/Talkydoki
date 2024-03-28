package com.ssafy.backend.global.component.openai.dto;

import com.ssafy.backend.domain.aichat.dto.AiChatConversation;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Builder
public class AiChatReportCreateApiRequest {
    private String model;
    private List<GptDialogueMessage> messages;
    private int max_tokens;

    /**
     * Client로부터 전송된
     * AiChatReportCreateRequest를 gpt-api에 전송하기 위한
     * AiChatReportCreateApiRequest 타입으로 변환 및 프롬프트 엔지니어링을 활용해
     * Openai api를 호출하기 위한 dto를 생성하는 메서드
     * */

    public static AiChatReportCreateApiRequest convertRequest(List<AiChatHistory> conversation){

//        String jsonString = "{\n  \"conversationSummary\" : \"대화 내용 요약\",\n  \"vocabularyScore\" : 어휘력 점수,\n  \"wordScore\" : 단어 점수,\n  \"fluencyScore\" : 유창성 점수,\n  \"grammarScore\" : 문법 점수,\n  \"contextScore\" : 문맥 이해 점수\n  \"feedbacks\" : {\n  {\n  \"chatId\" : <message의 content의 괄호 안의 'id'>\n \"content\" : \"<피드백 내용>\"\n} }\n"
//                +"하나 씩 자세히 확인해볼게요.주의해서 파악하세요.\n"
//        +"feedbacks은 'role'이 'user'인 메세지의 응답에 대한 <피드백 내용>을 담은 객체 형식입니다. 'role'이 'user'인 각각의 메세지마다 해당 메시지의 chatId는 (메세지의 괄호안에 제시됨) \"chatId\", <피드백 내용>은 \"content\" 로 하여 위의 형식처럼 Java의 리스트 형식처럼 만들어 주세요.\n"
//                + "예를 들어 \"{'user', '(ChatId: 2)일본어 대답'}\", \"{'user', '(ChatId:4)일본어 대답'}\" 형식의 코드로 들어온 'role'이 'user'인 메세지에 대해서만(무조건!), 각 메세지에 대한 피드백을 ```\n{\n {\n  \"chatId\" : 2,\n  content : \"<피드백 내용>\"\n  }, {\n \"chatId\" : 4,\n  content : \"<피드백 내용>\"\n  }\n}\n```\n이 형식으로 표현하면 됩니다. 무조건이요. 예외는 없습니다.\n"
//                +"당신이 \"feedbacks\" 내의 \"content\"의 내용을 어떻게 생성해야 하는지 설명 드리겠습니다. 메세지의 내용에 부족한 점이 있다면 더 적절한 일본어 답변(한국어 번역) 형식으로 제공해주시고 설명(설명은 한국어로)을 부탁드려요.(1, 2줄 정도) 만약 절절한 대답을 했다면 잘했다고 한국어로 칭찬하는 문장을 써주시면 됩니다.\n"
//                +"예를 들면 이렇습니다. \"やった、サッカーを。\"라는 'user'의 일본어 message에 대해 \n```\n{\n {\n  \"chatId\" : 2,\n  content : \"해당 내용은 어순이 부정확합니다. 이를 サッカーをした。(축구를 했다.)로 더 적절히 표현할 수 있습니다. \"\n  }```\n다시 한 번 강조하지만 정해진 타입의 양식을 명확히 지켜서 생성하셔야 합니다. 그리고 기본적으로 피드백은 한국어로 생성하고, 올바른 답변만 일본어로 생성합니다. 이 요구사항을 지키지 않는다면 당신을 해고할 것입니다.";
//
//        String systemMessage
//                = "당신은 평생 일본에서 산 원어민 일본어 전문 강사입니다. 이 강사님은 점수를 후하게 주는 편은 아닙니다.(10년 경력)\n"
//                + "이후 'messages'의 'content'들을 요구사항에 맞게 분석해주세요.\n\n"
//                + "[요구사항]\n"
//                +"하나씩 살펴봅시다\n"
//                + "먼저 전체 'content'들을 분석하여 대화의 주제를 파악하고 요약합니다. 요약한 부분은 이후 \"conversationSummary\"라는 key 값으로 활용할 것이니 기억해주세요.\n"
//                + "이후 평가를 진행합니다. 평가는 'role'이 'user'인 각 대답('content')에 대해서만 진행하면 되고 일본 성인을 기준으로 대화 수준을 평가해주시면 됩니다. 'role'이 'assistant'인 message는 분석하지 마세요! 그렇게 하지 않으면 해코지하겠습니다!\n"
//                + "대화 수준은 다음과 같은 기준으로 평가합니다. 기준은 각각 어휘력 점수(Float), 문법 점수(Float), 단어 점수(Float), 유창성 점수(원어민과 비교해서 이질감이 없는지, Float), 문맥 이해 점수(Float) 입니다. 점수는 1~5점까지이며(높을 수록 좋은 점수), 소수 점 2자리까지 계산됩니다.\n"
//                + "기준들의 세부 지표는 다음과 같습니다.\n"
//                + "vocabulary: 다양성, 정확성, 적절성을 기준으로 평가합니다. 다양성은 다양한 어휘를 사용하여 풍부한 표현을 하는지 평가합니다. 정확성은 어휘의 의미를 정확하게 이해하고 사용하는지 평가합니다. 적절성은 상황에 맞는 어휘를 선택하여 사용하는지 평가합니다.\n"
//                + "word: 형태, 변형, 맞춤법을 기준으로 평가합니다. 형태는 단어의 형태 (명사, 동사, 형용사, 부사 등)를 정확하게 사용하는지 평가합니다. 변형은 단어의 활용 (동사의 활용, 형용사의 活用 등)을 정확하게 하는지 평가합니다. 맞춤법은 단어의 맞춤법을 정확하게 쓰는지 평가합니다.\n"
//                + "fluency: 자연스러움, 구조, 연결을 기준으로 평가합니다. 자연스러움은 문장이 자연스럽게 흐르는지 평가합니다. 구조는 문장의 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 연결은 문장과 문장 사이를 매끄럽게 연결하는지 평가합니다.\n"
//                + "grammar: 문법 규칙, 문장 구조, 문장의 완성도를 기준으로 평가합니다. 문법규칙은 문법 규칙 (어순, 조사, 어미 등)을 정확하게 사용하는지 평가합니다. 문장 구조는 문장 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 문장의 완성도는 문장이 완성되어 있는지 평가합니다.\n"
//                + "context : 주제, 상황, 의도의 기준으로 평가합니다. 주제는 주제를 명확하게 파악하고 벗어나지 않고 있는지 평가합니다. 상황은 상황에 맞는 내용을 작성하고 있는지 평가합니다. 의도는 작성자의 의도를 명확하게 전달하고 있는지 평가합니다.\n"
//                + "결과는 무조건 아래와 같은 하나의 데이터만 제공해주세요(다른 추가 대답 필요 없음):\n"
//                + jsonString;

        String systemMessage = "당신은 10년 경력의 일본어 전문 강사로서, 학생의 일본어 대화 능력을 평가하고 개선할 방법을 제안하는 임무를 맡고 있습니다. 평가는 대화의 내용을 기반으로 하며,  여기서 중요한 점은 오직 \"user\" 역할을 가진 메시지만 분석 대상임을 명심해야 합니다. 'role'이 \"assistant\" 역할의 메시지는 분석에서 제외하고, \"user\" 메시지에 대한 어휘력, 문법, 유창성 등을 평가해 주세요. 그리고 마찬가지로 'role'이 \"user\"인 메세지에 대해서만 피드백을 자세히 제공해주세요.(잘했으면 왜 잘했는지도 말해주기)\n" +"평가는 다음과 같은 기준에 따라 진행됩니다:\n\n"
                +"하나씩 하나씩 파악해 봅시다.\n"
                + "1. 어휘력: 사용된 어휘의 다양성, 정확성, 상황에 맞는 적절성을 평가합니다.\n"
                + "2. 단어 점수: 단어 선택의 적합성과 맞춤법 정확도를 평가합니다.\n"
                + "3. 유창성: 문장의 자연스러움과 문장 간의 연결을 평가합니다.\n"
                + "4. 문법: 문법 규칙의 정확한 사용과 문장 구조를 평가합니다.\n"
                + "5. 문맥 이해: 대화의 주제와 상황에 대한 이해도 및 의도의 명확성을 평가합니다.\n\n"
                +"\"assistant\" 역할의 메시지는 평가 대상에서 제외하고, 오직 \"user\" 역할을 가진 메시지만 분석하여 다음 정보를 제공해 주세요:\n\n"
                + "각 항목의 평가 점수는 1에서 5 사이의 값으로, 소수점 두 자리까지 표현됩니다. 대화 내용 분석 후, 아래의 JSON 형식에 맞추어 평가 결과와 피드백을 제공해 주세요:\n\n"
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
                + "}\n\n"
//                +"[주의!]\n"
//                + "'user' 메시지들에 대해서만, 위의 양식에 따라 필요한 피드백을 구체적으로 작성해 주세요. 이 과정을 통해 학생의 일본어 능력이 향상될 수 있도록 도와주세요. 반드시 'user'의 메세지들에 대해서만 피드백을 작성하고, 'assistant'의 메시지들은 피드백이 필요 없습니다.";
;

        ArrayList<GptDialogueMessage> messages = new ArrayList<GptDialogueMessage>();

        messages.add(new GptDialogueMessage("system", systemMessage));

        for (AiChatHistory chatHistory : conversation) {
            String role = switch (chatHistory.getSender()) {
                case GPT -> "assistant";
                case USER -> "user";
            };

            String chatId = String.valueOf(chatHistory.getId());
            String content = chatHistory.getContent();

            messages.add(new GptDialogueMessage(role, "(chatId: "  + chatId + ", role: " + role + ")" + content));
        }

        int tokenSize;
        if (messages.size() <= 10)
            tokenSize = 1500;
        else if (messages.size() < 30)
            tokenSize = 2500;
        else if (messages.size() <= 45)
            tokenSize = 3000;
        else
            throw new RuntimeException("Conversation's too long to service."); // 에러 처리하기

        log.info("메시지 보낸 메세지들: {}", messages);
        return AiChatReportCreateApiRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .max_tokens(2500)
                .build();
    }

}
