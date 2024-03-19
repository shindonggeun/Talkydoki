package com.ssafy.backend.domain.aichat.dto.api;

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
    private List<OpenAiMessage> messages;
    private int max_tokens;

    /**
     * Client로부터 전송된
     * AiChatReportCreateRequest를 gpt-api에 전송하기 위한
     * AiChatReportCreateApiRequest 타입으로 변환 및 프롬프트 엔지니어링을 활용해
     * Openai api를 호출하기 위한 dto를 생성하는 메서드
     * */
    public static AiChatReportCreateApiRequest convertRequest(AiChatConversation createRequest){
        ArrayList<OpenAiMessage> messages = new ArrayList<OpenAiMessage>();
        messages.add(new OpenAiMessage("system", "당신은 평생 일본에서 산 원어민 일본어 전문 강사입니다. 이 강사님은 점수를 후하게 주는 편은 아닙니다.(10년 경력)\n다음 대화들을 요구사항에 맞게 분석해주세요. 평가는 'ユーザー:'라고 표시된 화자의 대화 부분만 해주시면 됩니다.\n일본 성인을 기준으로 대화 수준을 평가해주시면 됩니다.\n분석 내용은 대화 내용 요약(String), 어휘력 점수(Float), 문법 점수(Float), 단어 점수(Float), 유창성 점수(원어민과 비교해서 이질감이 없는지, Float), 문맥 이해 점수(Float) 입니다. 점수는 1~5점까지이며(높을 수록 좋은 점수), 소수 점 2자리까지 계산됩니다.\n평가 기준은 다음과 같습니다.\nvocabulary: 다양성, 정확성, 적절성을 기준으로 평가합니다. 다양성은 다양한 어휘를 사용하여 풍부한 표현을 하는지 평가합니다. 정확성은 어휘의 의미를 정확하게 이해하고 사용하는지 평가합니다. 적절성은 상황에 맞는 어휘를 선택하여 사용하는지 평가합니다.\nword: 형태, 변형, 맞춤법을 기준으로 평가합니다. 형태는 단어의 형태 (명사, 동사, 형용사, 부사 등)를 정확하게 사용하는지 평가합니다. 변형은 단어의 활용 (동사의 활용, 형용사의 活用 등)을 정확하게 하는지 평가합니다. 맞춤법은 단어의 맞춤법을 정확하게 쓰는지 평가합니다.\nfluency: 자연스러움, 구조, 연결을 기준으로 평가합니다. 자연스러움은 문장이 자연스럽게 흐르는지 평가합니다. 구조는 문장의 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 연결은 문장과 문장 사이를 매끄럽게 연결하는지 평가합니다.\ngrammar: 문법 규칙, 문장 구조, 문장의 완성도를 기준으로 평가합니다. 문법규칙은 문법 규칙 (어순, 조사, 어미 등)을 정확하게 사용하는지 평가합니다. 문장 구조는 문장 구조 (주어, 목적어, 동사 등)가 정확한지 평가합니다. 문장의 완성도는 문장이 완성되어 있는지 평가합니다.\ncontext : 주제, 상황, 의도의 기준으로 평가합니다. 주제는 주제를 명확하게 파악하고 벗어나지 않고 있는지 평가합니다. 상황은 상황에 맞는 내용을 작성하고 있는지 평가합니다. 의도는 작성자의 의도를 명확하게 전달하고 있는지 평가합니다.\n결과는 무조건 아래와 같은 하나의 데이터만 제공해주세요(다른 추가 대답 필요 없음):\n{\n  \"conversation_summary\" : \"대화 내용 요약\",\n  \"vocabulary_score\" : 어휘력 점수,\n  \"word_score\" : 단어 점수,\n  \"fluency_score\" : 유창성 점수,\n  \"grammar_score\" : 문법 점수,\n  \"context_score\" : 문맥 이해 점수\n}"));

        messages.add(new OpenAiMessage("user",createRequest.content()));

        return AiChatReportCreateApiRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .max_tokens(200)
                .build();
    }
}
