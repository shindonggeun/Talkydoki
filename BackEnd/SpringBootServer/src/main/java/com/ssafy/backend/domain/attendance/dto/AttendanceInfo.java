package com.ssafy.backend.domain.attendance.dto;

import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;

import java.time.LocalDateTime;

public record AttendanceInfo(
        Long id,
        AttendanceType type,
        LocalDateTime dateTime
) {
}
