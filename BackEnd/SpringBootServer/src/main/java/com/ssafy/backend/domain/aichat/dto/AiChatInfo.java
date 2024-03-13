package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChat;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.Sender;
import lombok.Builder;

// 이 레코드 값들을 리스트 형식으로 나타낼 것임
@Builder
public record AiChatInfo(
        Long id,
        AiChatRoom aiChatRoom,
        Sender sender,
        String content,

        Long userId
) {
    public static AiChatInfo from(AiChat aiChat) {
        return new AiChatInfo(
                aiChat.getId(),
                aiChat.getAiChatRoom(),
                aiChat.getSender(),
                aiChat.getContent(),
                aiChat.getMember().getId()
        );
    }
}
