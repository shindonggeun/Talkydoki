package com.ssafy.backend.domain.aichat.dto;


import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.member.entity.Member;

public record AiChatRoomCreateRequest(AiChatCategory category){
    public AiChatRoom toEntity(Member member) {
        return AiChatRoom.builder()
                .member(member)
                .category(category)
                .build();
    }
}