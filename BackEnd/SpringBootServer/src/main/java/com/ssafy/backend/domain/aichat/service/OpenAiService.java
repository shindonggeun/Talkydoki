package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.api.AiChatConversation;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.dto.api.AiChatReportCreateResponse;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

import java.util.Map;

public interface OpenAiService {
    public Mono<String> sendMessage(AiChatMessage createRequest);

    @Transactional
    public AiChatReportCreateResponse createReport(Long roomId, AiChatConversation aiChatConversation);

    // 아래 두 메서드는 WebClient를 사용하여 OpenAi api 호출
    // 비동기 방식을 사용해 아직 DB에 저장하는 로직 구현 방법 조사 중
//    public Mono<Map<String, Object>> createReport(Long roomId, AiChatConversation aiChatConversation);
//
//    public Mono<AiChatReportCreateResponse> test(Long roomId, AiChatConversation aiChatConversation);

}
