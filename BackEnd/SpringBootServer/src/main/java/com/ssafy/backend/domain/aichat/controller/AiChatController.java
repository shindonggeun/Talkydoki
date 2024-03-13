package com.ssafy.backend.domain.aichat.controller;

import com.ssafy.backend.domain.aichat.dto.AiChatCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatInfo;
import com.ssafy.backend.domain.aichat.service.AiChatService;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class AiChatController {

    private final AiChatService aiChatService;
    private final RabbitTemplate rabbitTemplate;
    private final StringRedisTemplate redisTemplate;

    /**
     * 채팅방 입장 시 처리
     * @param roomId 채팅방 아이디
     * @param loginActive 권한 인증 및 userId 사용 위함
     * @param message 메시지
     * @return 채팅 정보
     */

    // 이제 이 roomId, userId 정보를
    // room 만들어지고 그 값 사용하게 그리고
    // userId받아서 사용하게
    @MessageMapping("chat.enter.{roomId}")
    public AiChatInfo enterUser(@DestinationVariable("roomId") Long roomId, @AuthenticationPrincipal MemberLoginActive loginActive, @Payload AiChatCreateRequest message) {
        Long userId = loginActive.id();
        message.setContent(message.getSender() + "님이 채팅방에 입장했습니다.");
        return aiChatService.saveChat(message);
    }

    /**
     * 채팅방 메시지 전송 시 처리
     * @param roomId 채팅방 아이디
     * @param loginActive 권한 인증 및 userId 사용 위함
     * @param message 메시지
     * @return 채팅 정보
     */
    @MessageMapping("chat.talk.{roomId}")
    public AiChatInfo talkUser(@DestinationVariable("roomId") Long roomId, @DestinationVariable("userId") @AuthenticationPrincipal MemberLoginActive loginActive, @Payload AiChatCreateRequest message ) {
        Long userId = loginActive.id();
        rabbitTemplate.convertAndSend("chat.exchange", "*.room."+roomId, message);
        return aiChatService.saveChat(message);
    }
}