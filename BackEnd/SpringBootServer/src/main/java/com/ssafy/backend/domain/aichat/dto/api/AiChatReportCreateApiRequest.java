package com.ssafy.backend.domain.aichat.dto.api;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
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
     * AiChatCreateRequest dao를 gpt-api에 전송하기 위한
     * GptApiRequest dto로 변환
     * */
    public static AiChatReportCreateApiRequest convertRequest(AiChatReportCreateRequest createRequest){
        ArrayList<OpenAiMessage> messages = new ArrayList<OpenAiMessage>();
        messages.add(new OpenAiMessage("system", "다음 대화들을 분석해 주세요.\n분석 내용은 대화 내용 요약(String), 어휘력 점수(Float), 문법 점수(Float), 단어 점수(Float), 유창성 점수(원어민과 비교해서 이질감이 없는지, Float), 문맥 이해 점수(Float) 입니다. 점수는 1~5점까지이며(높을 수록 좋은 점수), 소수 점 2자리까지 계산됩니다.\n 결과는 다음과 같은 형식으로 제공해주세요(이대로만 응답해주시면 됩니다. 다른 대답 필요 없음):\n{\n  \"conversation_summary\" : \"대화 내용 요약\",\n  \"vocabulary_score\" : 어휘력 점수,\n  \"word_score\" : 단어 점수,\n  \"fluency_score\" : 유창성 점수,\n  \"grammar_score\" : 문법 점수,\n  \"context_score\" : 문맥 이해 점수\n}\n\n이제 대화 내용을 전달해드리겠습니다." + createRequest.content()));


        return AiChatReportCreateApiRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .max_tokens(150)
                .build();
    }
}
