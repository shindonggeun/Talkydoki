package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public record GptThreadResponse(
        String id,
        String object,
        @JsonProperty("created_at") int createdAt,
        Map<String, String> metadata
) {
}
