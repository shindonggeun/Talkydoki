package com.ssafy.backend.domain.attendance.controller;

import com.ssafy.backend.domain.attendance.dto.AttendanceInfo;
import com.ssafy.backend.domain.attendance.service.AttendanceService;
import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.jwt.security.MemberLoginActive;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "출석 관리", description = "출석 관리 관련 API 입니다.")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @Operation(
            summary = "나의 출석 목록 가져오기",
            description = "나의 출석 목록 (AI 회화 채팅, 뉴스 쉐도잉)을 가져오는 기능입니다."
    )
    @GetMapping("/list/get")
    @PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')")
    public ResponseEntity<Message<List<AttendanceInfo>>> getMyAttendanceList(@AuthenticationPrincipal MemberLoginActive loginActive) {
        List<AttendanceInfo> attendanceInfoList = attendanceService.getMyAttendanceList(loginActive.id());
        return ResponseEntity.ok().body(Message.success(attendanceInfoList));
    }
}
