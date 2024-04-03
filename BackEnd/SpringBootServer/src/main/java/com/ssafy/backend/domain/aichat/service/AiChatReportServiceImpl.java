package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.backend.domain.aichat.dto.AiChatAndFeedbackInfo;
import com.ssafy.backend.domain.aichat.dto.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatReportInfo;
import com.ssafy.backend.domain.aichat.dto.FullReportInfo;
import com.ssafy.backend.domain.aichat.entity.*;
import com.ssafy.backend.domain.aichat.repository.AiChatFeedbackRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;
import com.ssafy.backend.domain.attendance.service.AttendanceService;
import com.ssafy.backend.global.component.openai.OpenAiCommunicationProvider;
import com.ssafy.backend.global.component.openai.dto.GptReportRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiChatReportServiceImpl implements AiChatReportService {
    private final AiChatRoomRepository aiChatRoomRepository;
    private final AiChatHistoryRepository aiChatHistoryRepository;
    private final AiChatReportRepository aiChatReportRepository;
    private final AiChatFeedbackRepository aiChatFeedbackRepository;
    private final ObjectMapper objectMapper;
    private final OpenAiCommunicationProvider openAiCommunicationProvider;

    private final AttendanceService attendanceService;

    @Override
    public Mono<Long> createReport(Long memberId, Long roomId) {
        // aiChatHistoryRepository에서 roomId에 해당하는 히스토리(대화내역)를 조회
        return Mono.fromCallable(() -> aiChatHistoryRepository.findByAiChatRoomId(roomId))
                .subscribeOn(Schedulers.boundedElastic())
                // 조회된 히스토리를 기반으로 GptChatRequest 생성
                .map(GptReportRequest::fromAiChatHistories)
                // GptChatRequest를 사용해 GPT와 통신
                .flatMap(openAiCommunicationProvider::sendReportPromptToGPT)
                // GPT 응답을 AiChatReportCreateRequest 객체로 변환
                .flatMap(response -> {
                    log.info("GPT 레포트 결과!!!!: {}", response);
                    return Mono.fromCallable(() -> objectMapper.readValue(response, AiChatReportCreateRequest.class))
                            .flatMap(reportRequest -> {
                                // 여기서 보고서 저장 후, 생성된 보고서의 ID를 반환합니다.
                                Mono<Long> reportIdMono = saveReport(roomId, reportRequest);
                                // 보고서가 저장되면 출석을 생성합니다.
                                return reportIdMono.doOnSuccess(reportId -> {
                                    attendanceService.createAttendance(memberId, AttendanceType.AI_CHAT);
                                });
                            });
                });
    }

    @Override
    public FullReportInfo getReportDetail(Long reportId) {
        AiChatReport aiChatReport = aiChatReportRepository.findById(reportId).orElseThrow(() -> new IllegalArgumentException("Can't find the report with Id: " + reportId));

        List<AiChatAndFeedbackInfo> aiChatAndFeedbackInfos = aiChatFeedbackRepository.getAiChatFeedbackInfo(aiChatReport.getAiChatRoom().getId());

        return new FullReportInfo(AiChatReport.dto(aiChatReport), aiChatAndFeedbackInfos) ;
    }

    // 개선 사항: queryDSL 사용하면 더 빠르게 조회 가능할 것
    @Override
    public List<AiChatReportInfo> getUserReports(Long memberId) {
        List<AiChatRoom> aiChatRooms = aiChatRoomRepository.findByMemberId(memberId);

        // 각 AiChatRoom에 대한 AiChatReport를 조회하고, AiChatReportInfo로 변환하여 수집
        return aiChatRooms.stream()
                .map(aiChatRoom -> {
                    // AiChatRoom ID를 사용하여 각 AiChatRoom에 대응하는 AiChatReport를 조회하고, 존재하지 않으면 null 반환
                    return aiChatReportRepository.findByAiChatRoomId(aiChatRoom.getId())
                            .map(AiChatReport::dto)
                            .orElse(null); // 예외를 던지지 않고, 결과가 없을 경우 null 반환
                })
                .filter(Objects::nonNull) // null인 결과 제거
                .collect(Collectors.toList());
    }

    @Override
    public Mono<Long> saveReport(Long roomId, AiChatReportCreateRequest reportRequest) {
        return getAiChatReportCreateResponseMono(roomId, reportRequest);
    }

    @Override
    public Mono<Long> getAiChatReportCreateResponseMono(Long roomId, AiChatReportCreateRequest reportRequest) {
        return Mono.fromCallable(() -> aiChatRoomRepository.findById(roomId).orElseThrow(() -> new RuntimeException("Can't find the aiChatRoom with id: " + roomId)))
                .subscribeOn(Schedulers.boundedElastic())
                .flatMap(aiChatRoom -> {
                    AiChatReport report = AiChatReport.builder()
                            .aiChatRoom(aiChatRoom)
                            .conversationSummary(reportRequest.conversationSummary())
                            .vocabularyScore(reportRequest.vocabularyScore())
                            .wordScore(reportRequest.wordScore())
                            .grammarScore(reportRequest.grammarScore())
                            .fluencyScore(reportRequest.fluencyScore())
                            .contextScore(reportRequest.contextScore())
                            .build();

                    return Mono.fromCallable(() -> aiChatReportRepository.save(report))
                            .subscribeOn(Schedulers.boundedElastic())
                            .flatMap(savedReport -> Flux.fromIterable(reportRequest.feedbacks())
                                    .publishOn(Schedulers.boundedElastic())
                                    .flatMap(feedback ->
                                            Mono.fromCallable(() -> {
                                                AiChatHistory aiChatHistory = aiChatHistoryRepository.findById(feedback.chatId())
                                                        .orElseThrow(() -> new RuntimeException("Can't find the chat"));
                                                AiChatFeedback aiChatFeedback = AiChatFeedback.builder()
                                                        .aiChatHistory(aiChatHistory)
                                                        .content(feedback.content())
                                                        .build();
                                                aiChatFeedbackRepository.save(aiChatFeedback);
                                                return aiChatFeedback;
                                            }).subscribeOn(Schedulers.boundedElastic()))
                                    .then(Mono.just(savedReport.getId())));
                });
    }
}
