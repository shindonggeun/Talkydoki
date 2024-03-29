package com.ssafy.backend.global.component.openai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record Conversation(
        @JsonProperty("gpt_japanese") String gptJapaneseResponse,
        @JsonProperty("gpt_korean") String gptKoreanResponse,
        @JsonProperty("user_tip_japanese") String userTipJapaneseResponse,
        @JsonProperty("user_tip_korean") String userTipKoreanResponse
) {
}
