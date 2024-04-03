package com.ssafy.backend.domain.aichat.service;

import com.ssafy.backend.domain.aichat.dto.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatReportInfo;
import com.ssafy.backend.domain.aichat.dto.FullReportInfo;
import jakarta.transaction.Transactional;
import reactor.core.publisher.Mono;

import java.util.List;

public interface AiChatReportService {
    @Transactional
    Mono<Long> createReport(Long memberId, Long roomId);

    FullReportInfo getReportDetail(Long reportId);

    List<AiChatReportInfo> getUserReports(Long memberId);

    Mono<Long> saveReport(Long roomId, AiChatReportCreateRequest reportRequest);

    Mono<Long> getAiChatReportCreateResponseMono(Long roomId, AiChatReportCreateRequest reportRequest);
}
