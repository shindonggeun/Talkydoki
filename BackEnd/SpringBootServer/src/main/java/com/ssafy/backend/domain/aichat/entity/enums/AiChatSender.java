package com.ssafy.backend.domain.aichat.entity.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum AiChatSender {
    USER, GPT;

    @JsonValue
    public String getValue() {
        return this.name();
    }
}
