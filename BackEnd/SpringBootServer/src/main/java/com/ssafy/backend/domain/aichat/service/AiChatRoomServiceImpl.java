package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreatedResponse;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.enums.Category;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AiChatRoomServiceImpl implements AiChatRoomService {

    private final AiChatRoomRepository aiChatRoomRepository;
    private final MemberRepository memberRepository;

    @Override
    public AiChatRoomCreatedResponse createRoom(AiChatRoomCreateRequest createRequest) {

        Member member = memberRepository.findById(createRequest.userId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with the id: " + createRequest.userId()));
//        Category category = createRequest.category();

        AiChatRoom aiChatRoom = AiChatRoom.builder()
                        .member(member)
                                .category(createRequest.category())
                                        .build();

        aiChatRoomRepository.save(aiChatRoom);


        return AiChatRoomCreatedResponse.from(aiChatRoom);
    }

    @Override
    public List<AiChatRoomCreatedResponse> getAllRooms(Long userId) {


        List<AiChatRoom> aiChatRooms = aiChatRoomRepository.findByMemberId(userId);
        return aiChatRooms.stream().map(AiChatRoomCreatedResponse::from).toList();
    }
}
