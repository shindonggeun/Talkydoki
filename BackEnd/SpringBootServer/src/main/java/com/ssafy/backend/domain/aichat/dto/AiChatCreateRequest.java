package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChat;
import com.ssafy.backend.domain.aichat.entity.enums.Sender;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AiChatCreateRequest {
    private Sender sender;

    private String content;
    public AiChat toEntity() {
        return AiChat.builder()
                .sender(sender)
                .build();
    }
}



