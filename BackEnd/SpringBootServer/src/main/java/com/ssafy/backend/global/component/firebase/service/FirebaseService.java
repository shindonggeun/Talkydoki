package com.ssafy.backend.global.component.firebase.service;

import org.springframework.web.multipart.MultipartFile;

/**
 * Firebase Storage를 통한 파일 업로드 기능을 제공하는 서비스 인터페이스입니다.
 */
public interface FirebaseService {

    /**
     * Firebase Storage에 파일을 업로드하고 파일의 URL을 반환합니다.
     *
     * @param file 업로드할 파일 객체입니다.
     * @param nameFile 저장될 파일의 이름입니다.
     * @return 업로드된 파일의 공개 URL입니다.
     */
    String uploadFiles(MultipartFile file, String nameFile);
}
