package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatMessage;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
import com.ssafy.backend.domain.aichat.entity.AiChatHistory;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatCategory;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AiChatServiceImpl implements AiChatService {

    private final AiChatHistoryRepository aiChatHistoryRepository;
    private final MemberRepository memberRepository;
    private final AiChatRoomRepository aiChatRoomRepository;


//    @Override
//    public AiChatInfo saveChat( AiChatCreateRequest aiChatCreateRequest) {
//
//        Member member = memberRepository.findById(aiChatCreateRequest.getUserId())
//                .orElseThrow(()->new IllegalArgumentException("User not found with the id: " + aiChatCreateRequest.getUserId()));
//        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(aiChatCreateRequest.getRoomId())
//                .orElseThrow(()->new IllegalArgumentException("User not found with the id: " + aiChatCreateRequest.getRoomId()));
//
//
//        AiChat aiChat = AiChat.builder()
//                .member(member)
//                .aiChatRoom(aiChatRoom)
//                .sender(aiChatCreateRequest.getSender())
//                .content(aiChatCreateRequest.getContent())
//                .build();
//
//        aiChatHistoryRepository.save(aiChat);
//
//        return AiChatInfo.from(aiChat);
//    }

    @Override
    public AiChatRoomCreateResponse creatAiChatRoom(Long memberId, AiChatCategory category) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        AiChatRoom aiChatRoom = AiChatRoom.builder()
                .member(member)
                .category(category)
                .build();

        AiChatRoom room = aiChatRoomRepository.save(aiChatRoom);

        return AiChatRoomCreateResponse.builder()
                .id(room.getId())
                .memberId(memberId)
                .category(category)
                .build();
    }

    @Override
    public void sendMessageAiChat(Long memberId, Long roomId, AiChatMessage messageRequest) {
        Member member = memberRepository.findById(memberId).orElseThrow(()
        -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        // TODO: AI 회화 채팅 커스텀 Exception 처리
        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId).orElseThrow(()
        -> new RuntimeException("해당 AI 회화 채팅방을 찾을 수 없습니다."));

        AiChatHistory aiChatHistory = AiChatHistory.builder()
                .aiChatRoom(aiChatRoom)
                .sender(messageRequest.sender())
                .content(messageRequest.content())
                .build();

        aiChatHistoryRepository.save(aiChatHistory);


    }
}
