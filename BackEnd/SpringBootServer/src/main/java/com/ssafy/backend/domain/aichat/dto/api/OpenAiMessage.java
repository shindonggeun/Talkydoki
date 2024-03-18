package com.ssafy.backend.domain.aichat.dto.api;

// Openai api 호출 위한 DTO
public record OpenAiMessage(
        String role,
        String content
) {
}
