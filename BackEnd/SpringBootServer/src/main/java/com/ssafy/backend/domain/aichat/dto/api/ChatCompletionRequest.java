package com.ssafy.backend.domain.aichat.dto.api;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatCompletionRequest {
    private String model;
    private List<OpenAiMessage> messages;
    private int max_tokens;

    /**
     * AiChatCreateRequest dao를 gpt-api에 전송하기 위한
     * GptApiRequest dto로 변환
     * */
    public static ChatCompletionRequest convertRequest(AiChatMessage createRequest){
        ArrayList<OpenAiMessage> messages = new ArrayList<OpenAiMessage>();
        messages.add(new OpenAiMessage("user", createRequest.content()));

        return ChatCompletionRequest.builder()
                .model("gpt-3.5-turbo")
                .messages(messages)
                .max_tokens(30)
                .build();
    }

}
