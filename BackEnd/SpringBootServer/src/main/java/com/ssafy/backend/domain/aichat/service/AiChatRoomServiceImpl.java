//package com.ssafy.backend.domain.aichat.service;
//
//import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateRequest;
//import com.ssafy.backend.domain.aichat.dto.AiChatRoomCreateResponse;
//import com.ssafy.backend.domain.aichat.dto.CreatedStompEndpointResponse;
//import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
//import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
//import com.ssafy.backend.domain.member.entity.Member;
//import com.ssafy.backend.domain.member.repository.MemberRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class AiChatRoomServiceImpl implements AiChatRoomService {
//
//    private final AiChatRoomRepository aiChatRoomRepository;
//    private final MemberRepository memberRepository;
//
//    @Override
//    public CreatedStompEndpointResponse createRoom(AiChatRoomCreateRequest createRequest) {
//
//        Member member = memberRepository.findById(createRequest.userId())
//                .orElseThrow(() -> new IllegalArgumentException("User not found with the id: " + createRequest.userId()));
////        Category category = createRequest.category();
//
//        AiChatRoom aiChatRoom = AiChatRoom.builder()
//                        .member(member)
//                                .category(createRequest.category())
//                                        .build();
//
//        aiChatRoomRepository.save(aiChatRoom);
//
//        // 생성된 roomId와 userId를 사용하여 STOMP 엔드포인트 URL 생성
//        String stompEndpoint = String.format("http://localhost:8080/chat-room.%d", aiChatRoom.getId());
//
//        // format 배포 시, 그리고 https 인증 받는 다면
//        // 변경해 주어야함!
//        // JPA .. .getId(), 그냥 .id() dao, dto 타입에 따라 어떻게 다른지 확인하기!!
//
//
//        return CreatedStompEndpointResponse.from(aiChatRoom, stompEndpoint);
//    }
//
//    @Override
//    public List<AiChatRoomCreateResponse> getAllRooms(Long userId) {
//
//
//        List<AiChatRoom> aiChatRooms = aiChatRoomRepository.findByMemberId(userId);
//        return aiChatRooms.stream().map(AiChatRoomCreateResponse::from).toList();
//    }
//}
