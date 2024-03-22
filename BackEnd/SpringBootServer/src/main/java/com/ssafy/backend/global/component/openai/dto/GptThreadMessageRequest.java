package com.ssafy.backend.global.component.openai.dto;

public record GptThreadMessageRequest(
        String role,
        String content
) {
}
