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
    public void save(Long roomId, GptSetupRequest setupRequest) {
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
        redisTemplate.opsForList().rightPushAll(key, messages);
        redisTemplate.expire(AI_CHAT_HISTORY_KEY_PREFIX, EXPIRES_MIN, TimeUnit.MINUTES);
    }

    public Mono<List<GptDialogueMessage>> findAiChatHistory(Long roomId) {
        // 레디스 템플릿의 range 메서드는 범위를 지정하여 리스트에서 요소들을 가져옵니다.
        // 여기서는 0부터 -1까지 지정하여 전체 리스트를 가져옵니다.
        List<Object> historyObjects = redisTemplate.opsForList().range(AI_CHAT_HISTORY_KEY_PREFIX, 0, -1);
        if (historyObjects == null) {
            return Mono.empty();
        }
        // 안전한 타입 변환 수행
        List<GptDialogueMessage> history = historyObjects.stream()
                .filter(GptDialogueMessage.class::isInstance)
                .map(GptDialogueMessage.class::cast)
                .collect(Collectors.toList());

        return Mono.justOrEmpty(history);
    }

}
