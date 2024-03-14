package com.ssafy.backend.domain.aichat.dto;

import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.Category;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

//@Getter
//public class AiChatRoomCreateRequest{
//
//    private Long userId;
//
//    private Category category;
//
//}

public record AiChatRoomCreateRequest(
        Long userId,
        Category category
){
}