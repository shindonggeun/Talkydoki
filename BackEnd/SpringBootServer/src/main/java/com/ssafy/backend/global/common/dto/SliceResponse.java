package com.ssafy.backend.global.common.dto;

import lombok.Getter;
import org.springframework.data.domain.Slice;
import java.util.List;

/**
 * 페이지네이션을 위한 응답 데이터를 캡슐화하는 클래스입니다.
 * Spring Data의 {@link Slice} 객체를 사용하여, 페이지네이션 결과를 보다 쉽게 처리할 수 있게 합니다.
 *
 * @param <T> 페이지네이션된 데이터의 타입
 */
@Getter
public class SliceResponse<T> {
    private final List<T> contents; // 현재 페이지의 데이터 목록
    private final Boolean hasNext; // 다음 페이지의 존재 여부

    /**
     * {@link Slice} 객체를 받아 {@link SliceResponse} 객체를 생성합니다.
     * 이 정적 메소드는 클라이언트 코드에서 Slice 객체를 기반으로 응답 객체를 쉽게 생성할 수 있게 합니다.
     *
     * @param items 페이지네이션 결과를 담고 있는 {@link Slice} 객체
     * @param <T> 페이지네이션된 데이터의 타입
     * @return 생성된 {@link SliceResponse} 객체
     */
    public static <T> SliceResponse<T> of(Slice<T> items) {
        return new SliceResponse<>(items);
    }

    /**
     * {@link SliceResponse} 객체의 생성자입니다.
     * 이 생성자는 {@link Slice} 객체를 받아, 내부 상태를 초기화합니다.
     * private으로 선언되어 있어, 외부에서 직접 인스턴스화를 방지하고 {@link #of(Slice)} 메소드를 통해 객체를 생성하도록 유도합니다.
     *
     * @param items 페이지네이션 결과를 담고 있는 {@link Slice} 객체
     */
    private SliceResponse(Slice<T> items) {
        this.contents = items.getContent(); // 페이지네이션된 데이터 목록을 설정
        this.hasNext = items.hasNext(); // 다음 페이지 존재 여부를 설정
    }
}
