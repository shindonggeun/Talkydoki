package com.ssafy.backend.global.component.openai.repository;


import com.ssafy.backend.global.component.openai.dto.GptDialogueMessage;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import com.ssafy.backend.global.component.openai.dto.GptSetupRequest;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * AiChatSetupRepository는 AI 채팅봇 설정을 관리하는 데 사용됩니다.
 * 이 클래스는 Redis를 사용하여 설정을 저장, 조회하는 기능을 제공합니다.
 */
@Repository
@RequiredArgsConstructor
public class OpenAiRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String OPEN_AI_SETUP_KEY_PREFIX = "openAiSetup::";
    private static final String AI_CHAT_HISTORY_KEY_PREFIX = "aiChatHistory::";
    private static final int EXPIRES_MIN = 30;	// 해당 채팅 제한시간 30분

    /**
     * 주어진 roomId와 GptSetupRequest를 Redis에 저장합니다.
     *
     * @param roomId 채팅방 ID, Redis에 저장될 키의 일부로 사용됩니다.
     * @param setupRequest GptSetupRequest 객체, Redis에 값으로 저장됩니다.
     */
    public void saveOpenAiSetup(Long roomId, GptSetupRequest setupRequest) {
        String key = OPEN_AI_SETUP_KEY_PREFIX + roomId;
        redisTemplate.opsForValue().set(key, setupRequest);
        redisTemplate.expire(key, EXPIRES_MIN, TimeUnit.MINUTES);
    }

    // Mono로 변경
    public Mono<GptSetupRequest> findOpenAiSetup(Long roomId) {
        return Mono.justOrEmpty((GptSetupRequest) redisTemplate.opsForValue().get(OPEN_AI_SETUP_KEY_PREFIX + roomId));
    }

    public void saveAiChatHistory(Long roomId, List<GptDialogueMessage> messages) {
        String key = AI_CHAT_HISTORY_KEY_PREFIX + roomId;
        // List의 각 요소를 Redis 리스트에 저장
        messages.forEach(message -> redisTemplate.opsForList().rightPush(key, message));
        redisTemplate.expire(key, EXPIRES_MIN, TimeUnit.MINUTES);
    }

    public Mono<List<GptDialogueMessage>> findAiChatHistory(Long roomId) {
        String key = AI_CHAT_HISTORY_KEY_PREFIX + roomId;
        // Redis에서 리스트의 모든 요소를 조회
        List<Object> historyObjects = redisTemplate.opsForList().range(key, 0, -1);
        if (historyObjects == null) {
            return Mono.empty();
        }
        // 조회된 요소들을 GptDialogueMessage로 변환
        List<GptDialogueMessage> history = historyObjects.stream()
                .filter(obj -> obj instanceof GptDialogueMessage)
                .map(obj -> (GptDialogueMessage) obj)
                .collect(Collectors.toList());

        return Mono.just(history);
    }

}
