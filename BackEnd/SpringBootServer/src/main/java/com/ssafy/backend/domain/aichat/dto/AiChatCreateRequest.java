package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChat;
import com.ssafy.backend.domain.aichat.entity.enums.Sender;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class AiChatCreateRequest {
    private Long userId;

    private Long roomId;

    private Sender sender;

    private String content;


}



