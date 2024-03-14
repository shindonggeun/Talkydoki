package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatInfo;
import com.ssafy.backend.domain.aichat.entity.AiChat;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.repository.AiChatRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiChatServiceImpl implements AiChatService {

    private final AiChatRepository aiChatRepository;
    private final MemberRepository memberRepository;
    private final AiChatRoomRepository aiChatRoomRepository;

    @Override
    public List<AiChatInfo> getAllMessagesByRoomId(Long userId, Long roomId) {
        // 방의 접근 권한을 검증
        validateUserAccessToRoom(userId, roomId);

        // 방 ID에 해당하는 모든 메시지를 조회
        // Jpa에 따라 이미 만들어진 메서드
        List<AiChat> messages = aiChatRepository.findByAiChatRoomId(roomId);
        return messages.stream().map(AiChatInfo::from).toList();

    }


    private AiChatRoom validateUserAccessToRoom(Long userId, Long roomId) {
        // findById가 optional 타입(?)이므로 orElseThrow같은
        // null 값 처리를 해줘야함 ..?? 정리하기
        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));

        // 방에 속한 사용자 ID가 요청한 사용자 ID와 동일한지 확인.
        if (!aiChatRoom.getMember().getId().equals(userId)){
            throw new IllegalArgumentException("User does not have access to this room");
        }

        return aiChatRoom;

    }

    @Override
    public AiChatInfo saveChat( AiChatCreateRequest aiChatCreateRequest) {

        Member member = memberRepository.findById(aiChatCreateRequest.getUserId())
                .orElseThrow(()->new IllegalArgumentException("User not found with the id: " + aiChatCreateRequest.getUserId()));
        AiChatRoom aiChatRoom = aiChatRoomRepository.findById(aiChatCreateRequest.getRoomId())
                .orElseThrow(()->new IllegalArgumentException("User not found with the id: " + aiChatCreateRequest.getRoomId()));


        AiChat aiChat = AiChat.builder()
                .member(member)
                .aiChatRoom(aiChatRoom)
                .sender(aiChatCreateRequest.getSender())
                .content(aiChatCreateRequest.getContent())
                .build();

        aiChatRepository.save(aiChat);

        return AiChatInfo.from(aiChat);
    }
}
