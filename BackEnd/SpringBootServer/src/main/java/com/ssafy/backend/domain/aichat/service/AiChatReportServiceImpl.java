package com.ssafy.backend.domain.aichat.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.backend.domain.aichat.dto.AiChatAndFeedbackInfo;
import com.ssafy.backend.domain.aichat.dto.AiChatReportCreateRequest;
import com.ssafy.backend.domain.aichat.dto.AiChatReportInfo;
import com.ssafy.backend.domain.aichat.dto.FullReportInfo;
import com.ssafy.backend.domain.aichat.entity.AiChatReport;
import com.ssafy.backend.domain.aichat.entity.AiChatRoom;
import com.ssafy.backend.domain.aichat.entity.QAiChatFeedback;
import com.ssafy.backend.domain.aichat.entity.QAiChatHistory;
import com.ssafy.backend.domain.aichat.entity.enums.AiChatSender;
import com.ssafy.backend.domain.aichat.repository.AiChatHistoryRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatReportRepository;
import com.ssafy.backend.domain.aichat.repository.AiChatRoomRepository;
import com.ssafy.backend.domain.attendance.entity.enums.AttendanceType;
import com.ssafy.backend.domain.attendance.service.AttendanceService;
import com.ssafy.backend.global.component.openai.OpenAiCommunicationProvider;
import com.ssafy.backend.global.component.openai.dto.GptChatRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
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
    private final ObjectMapper objectMapper;
    private final OpenAiCommunicationProvider openAiCommunicationProvider;

    private final JPAQueryFactory jpaQueryFactory;

    private final AttendanceService attendanceService;

    @Override
    public Mono<Long> createReport(Long memberId, Long roomId) {
        // aiChatHistoryRepository에서 roomId에 해당하는 히스토리(대화내역)를 조회
        return Mono.fromCallable(() -> aiChatHistoryRepository.findByAiChatRoomId(roomId))
                .subscribeOn(Schedulers.boundedElastic())
                // 조회된 히스토리를 기반으로 GptChatRequest 생성
                .map(GptChatRequest::fromAiChatHistories)
                // GptChatRequest를 사용해 GPT와 통신
                .flatMap(openAiCommunicationProvider::sendPromptToGpt)
                // GPT 응답을 AiChatReportCreateRequest 객체로 변환
                .flatMap(response -> {
                    log.info("GPT 레포트 결과!!!!: {}", response);
                    return Mono.fromCallable(() -> objectMapper.readValue(response, AiChatReportCreateRequest.class))
                            .flatMap(reportRequest -> {
                                // 여기서 보고서 저장 후, 생성된 보고서의 ID를 반환합니다.
                                Mono<Long> reportIdMono = openAiCommunicationProvider.saveReport(roomId, reportRequest);
                                // 보고서가 저장되면 출석을 생성합니다.
                                return reportIdMono.doOnSuccess(reportId -> {
                                    attendanceService.createAttendance(memberId, AttendanceType.AI_CHAT);
                                });
                            });
                });
    }


    @Override
    public List<AiChatAndFeedbackInfo> getAiChatFeedbackInfo() {
        QAiChatHistory qAiChatHistory = QAiChatHistory.aiChatHistory;
        QAiChatFeedback qAiChatFeedback = QAiChatFeedback.aiChatFeedback;

        // 급한대로 gpt의 피드백도 생기는 오류를
        // 아래 분기를 통해 해결
        return jpaQueryFactory
                .select(
                        qAiChatHistory.id, // 이 부분은 chatId를 나타내며, AiChatHistory의 ID를 참조합니다.
                        qAiChatHistory.sender, // sender에 해당
                        qAiChatHistory.content, // message에 해당
                        new CaseBuilder()
                                .when(qAiChatHistory.sender.eq(AiChatSender.GPT)) // sender가 GPT enum 값과 동일한 경우
                                .then(Expressions.stringTemplate("CAST(NULL AS java.lang.String)")) // feedback을 null로 설정
                                .otherwise(qAiChatFeedback.content) // 그렇지 않으면 실제 feedback 내용 사용
                )
                .from(qAiChatHistory)
                .leftJoin(qAiChatFeedback).on(qAiChatHistory.id.eq(qAiChatFeedback.aiChatHistory.id))
                .fetch()
                .stream()
                .map(tuple -> new AiChatAndFeedbackInfo(
                        tuple.get(qAiChatHistory.id),
                        tuple.get(qAiChatHistory.sender),
                        tuple.get(qAiChatHistory.content),
                        tuple.get(3, String.class) // feedback에 해당하는 값 처리
                ))
                .toList();
    }

    @Override
    public FullReportInfo getReportDetail(Long reportId) {
        AiChatReport aiChatReport = aiChatReportRepository.findById(reportId).orElseThrow(() -> new RuntimeException("Can't find the report with id: " + reportId));

        List<AiChatAndFeedbackInfo> aiChatAndFeedbackInfos = this.getAiChatFeedbackInfo();

        return new FullReportInfo(AiChatReport.dto(aiChatReport), aiChatAndFeedbackInfos) ;
    }

    @Override
    public List<AiChatReportInfo> getUserReports(Long memberId) {
        List<AiChatRoom> aiChatRooms = aiChatRoomRepository.findByMemberId(memberId);

        // 각 AiChatRoom에 대한 AiChatReport를 조회하고, AiChatReportInfo로 변환하여 수집
        return aiChatRooms.stream()
                .map(aiChatRoom -> {
                    // AiChatRoom ID를 사용하여 각 AiChatRoom에 대응하는 AiChatReport를 조회
                    AiChatReport aiChatReport = aiChatReportRepository.findByAiChatRoomId(aiChatRoom.getId());
                    // AiChatReport가 존재하고, 해당 AiChatRoom의 category 정보를 사용하여 AiChatReportInfo 생성
                    return (aiChatReport != null) ? new AiChatReportInfo(aiChatReport.getId(), aiChatRoom.getCategory()) : null;
                })
                .filter(Objects::nonNull) // null인 결과 제거
                .collect(Collectors.toList());
    }
}
