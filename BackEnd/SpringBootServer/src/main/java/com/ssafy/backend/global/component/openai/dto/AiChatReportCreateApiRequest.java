package com.ssafy.backend.global.component.openai.dto;

import com.ssafy.backend.domain.aichat.dto.AiChatConversation;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

        String jsonString = "{\n  \"conversationSummary\" : \"대화 내용 요약\",\n  \"vocabularyScore\" : 어휘력 점수,\n  \"wordScore\" : 단어 점수,\n  \"fluencyScore\" : 유창성 점수,\n  \"grammarScore\" : 문법 점수,\n  \"contextScore\" : 문맥 이해 점수\n  \"feedbacks\" : {\n  {\n  \"chatId\" : <message의 content의 괄호 안의 'id'>\n \"content\" : \"<피드백 내용>\"\n} }\n"
                +"하나 씩 자세히 확인해볼게요.주의해서 파악하세요.\n"
        +"feedbacks은 'role'이 'user'인 메세지의 응답에 대한 <피드백 내용>을 담은 객체 형식입니다. 'role'이 'user'인 각각의 메세지마다 해당 메시지의 chatId는 (메세지의 괄호안에 제시됨) \"chatId\", <피드백 내용>은 \"content\" 로 하여 위의 형식처럼 Java의 리스트 형식처럼 만들어 주세요.\n"
                + "예를 들어 \"{'user', '(ChatId: 2)일본어 대답'}\", \"{'user', '(ChatId:4)일본어 대답'}\" 형식의 코드로 들어온 'role'이 'user'인 메세지에 대해서만(무조건!), 각 메세지에 대한 피드백을 ```\n{\n {\n  \"chatId\" : 2,\n  content : \"<피드백 내용>\"\n  }, {\n \"chatId\" : 4,\n  content : \"<피드백 내용>\"\n  }\n}\n```\n이 형식으로 표현하면 됩니다. 무조건이요. 예외는 없습니다.\n"
                +"당신이 \"feedbacks\" 내의 \"content\"의 내용을 어떻게 생성해야 하는지 설명 드리겠습니다. 메세지의 내용에 부족한 점이 있다면 더 적절한 일본어 답변(한국어 번역) 형식으로 제공해주시고 설명(설명은 한국어로)을 부탁드려요. (1, 2줄 정도)\n"
                +"예를 들면 이렇습니다. \"やった、サッカーを。\"라는 'user'의 일본어 message에 대해 \n```\n{\n {\n  \"chatId\" : 2,\n  content : \"해당 내용은 어순이 부정확합니다. 이를 サッカーをした。(축구를 했다.)로 더 적절히 표현할 수 있습니다. \"\n  }```\n다시 한 번 강조하지만 정해직 타입의 양식을 명확히 지켜서 생성하셔야 합니다. 그렇지 않으면 당신은 큰 위험에 처할 것 입니다.";

        String systemMessage
                = "당신은 평생 일본에서 산 원어민 일본어 전문 강사입니다. 이 강사님은 점수를 후하게 주는 편은 아닙니다.(10년 경력)\n"
                + "이후 'messages'의 'content'들을 요구사항에 맞게 분석해주세요.\n\n"
                + "[요구사항]\n"
                +"하나씩 살펴봅시다\n"
                + "먼저 전체 'content'들을 분석하여 대화의 주제를 파악하고 요약합니다. 요약한 부분은 이후 \"conversationSummary\"라는 key 값으로 활용할 것이니 기억해주세요.\n"
                + "이후 평가를 진행합니다. 평가는 'role'이 'user'인 각 대답('content')에 대해서만 진행하면 되고 일본 성인을 기준으로 대화 수준을 평가해주시면 됩니다. 'role'이 'assistant'인 message는 분석하지 마세요! 그렇게 하지 않으면 해코지하겠습니다!\n"
                + "대화 수준은 다음과 같은 기준으로 평가합니다. 기준은 각각 어휘력 점수(Float), 문법 점수(Float), 단어 점수(Float), 유창성 점수(원어민과 비교해서 이질감이 없는지, Float), 문맥 이해 점수(Float) 입니다. 점수는 1~5점까지이며(높을 수록 좋은 점수), 소수 점 2자리까지 계산됩니다.\n"
                + "기준들의 세부 지표는 다음과 같습니다.\n"
                + "vocabulary: 다양성, 정확성, 적절성을 기준으로 평가합니다. 다양성은 다양한 어휘를 사용하여 풍부한 표현을 하는지 평가합니다. 정확성은 어휘의 의미를 정확하게 이해하고 사용하는지 평가합니다. 적절성은 상황에 맞는 어휘를 선택하여 사용하는지 평가합니다.\n"
                + "word: 형태, 변형, 맞춤법을 기준으로 평가합니다. 형태는 단어의 형태 (명사, 동사, 형용사, 부사 등)를 정확하게 사용하는지 평가합니다. 변형은 단어의 활용 (동사의 활용, 형용사의 活用 등)을 정확하게 하는지 평가합니다. 맞춤법은 단어의 맞춤법을 정확하게 쓰는지 평가합니다.\n"
                + "fluency: 자연스러움, 구조, 연결을 기준으로 평가합니다. 자연스러움은 문장이 자연스럽게 흐르는지 평가합니다. 구조는 문장의 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 연결은 문장과 문장 사이를 매끄럽게 연결하는지 평가합니다.\n"
                + "grammar: 문법 규칙, 문장 구조, 문장의 완성도를 기준으로 평가합니다. 문법규칙은 문법 규칙 (어순, 조사, 어미 등)을 정확하게 사용하는지 평가합니다. 문장 구조는 문장 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 문장의 완성도는 문장이 완성되어 있는지 평가합니다.\n"
                + "context : 주제, 상황, 의도의 기준으로 평가합니다. 주제는 주제를 명확하게 파악하고 벗어나지 않고 있는지 평가합니다. 상황은 상황에 맞는 내용을 작성하고 있는지 평가합니다. 의도는 작성자의 의도를 명확하게 전달하고 있는지 평가합니다.\n"
                + "결과는 무조건 아래와 같은 하나의 데이터만 제공해주세요(다른 추가 대답 필요 없음):\n"
                + jsonString;


        ArrayList<GptDialogueMessage> messages = new ArrayList<GptDialogueMessage>();

        messages.add(new GptDialogueMessage("system", systemMessage));

        for (AiChatHistory chatHistory : conversation) {
            String role = switch (chatHistory.getSender()) {
                case GPT -> "assistant";
                case USER -> "user";
            };

            String chatId = String.valueOf(chatHistory.getId());
            String content = chatHistory.getContent();

            messages.add(new GptDialogueMessage(role, "(chatId: "  + chatId + ")" + content));
        }

        return AiChatReportCreateApiRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .max_tokens(1000)
                .build();
    }

}
