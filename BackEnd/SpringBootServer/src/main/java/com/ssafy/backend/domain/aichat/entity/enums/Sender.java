package com.ssafy.backend.domain.aichat.entity.enums;

public enum Sender {
    USER, GPT;

    public static Sender fromName(String sender){
        return Sender.valueOf(sender.toUpperCase());
    }
}
