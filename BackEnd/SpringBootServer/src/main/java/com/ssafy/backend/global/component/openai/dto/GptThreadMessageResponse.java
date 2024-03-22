package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;
import java.util.Map;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GptThreadMessageResponse(
        String id,
        String object,
        int createdAt,
        String threadId,
        String role,
        List<Content> content,
        List<String> fileIds,
        String assistantId,
        String runId,
        Map<String, Object> metadata
) {
    public static record Content(
            String type,
            Text text
    ) {}

    public static record Text(
            String value,
            List<Annotation> annotations
    ) {}

    public static record Annotation() {}
}