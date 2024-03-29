package com.ssafy.backend.domain.attendance.service;

import com.ssafy.backend.domain.attendance.dto.AttendanceInfo;
import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;

import java.util.List;

public interface AttendanceService {

    void createAttendance(Long memberId, AttendanceType attendanceType);

    List<AttendanceInfo> getMyAttendanceList(Long memberId);
}
