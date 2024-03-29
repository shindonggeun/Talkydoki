package com.ssafy.backend.domain.attendance.service;

import com.ssafy.backend.domain.attendance.dto.AttendanceInfo;
import com.ssafy.backend.domain.attendance.entity.Attendance;
import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;
import com.ssafy.backend.domain.attendance.repository.AttendanceRepository;
import com.ssafy.backend.domain.member.entity.Member;
import com.ssafy.backend.domain.member.exception.MemberErrorCode;
import com.ssafy.backend.domain.member.exception.MemberException;
import com.ssafy.backend.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {
    private final MemberRepository memberRepository;
    private final AttendanceRepository attendanceRepository;

    @Override
    public void createAttendance(Long memberId, AttendanceType attendanceType) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        Attendance attendance = Attendance.builder()
                .member(member)
                .type(attendanceType)
                .build();

        attendanceRepository.save(attendance);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AttendanceInfo> getMyAttendanceList(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.NOT_FOUND_MEMBER));

        List<Attendance> attendanceList = attendanceRepository.findByMemberIdThisYear(memberId);

        return attendanceList.stream()
                .map(attendance -> new AttendanceInfo(
                        attendance.getId(),
                        attendance.getType(),
                        attendance.getCreatedAt()))
                .collect(Collectors.toList());
    }
}
