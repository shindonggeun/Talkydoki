package com.ssafy.backend.global.component.firebase.service;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 * {@link FirebaseService} 인터페이스의 구현체로, Firebase Storage를 사용하여 파일을 업로드합니다.
 */
@Slf4j
@Service
public class FirebaseServiceImpl implements FirebaseService {
    @Value("${app.firebase-bucket}")
    private String firebaseBucket; // Firebase Storage 버킷 이름

    /**
     * MultipartFile을 Firebase Storage에 업로드하고, 업로드된 파일의 URL을 반환합니다.
     *
     * @param file 업로드할 파일 객체입니다.
     * @param nameFile 저장될 파일의 이름입니다. 이 이름을 통해 Firebase에서 파일을 식별합니다.
     * @return 업로드된 파일의 공개 URL입니다. 파일에 공개적으로 접근할 수 있는 URL을 제공합니다.
     * @throws RuntimeException 파일 업로드 과정에서 오류가 발생한 경우 예외를 발생시킵니다.
     */
    @Override
    public String uploadFiles(MultipartFile file, String nameFile) {
        Bucket bucket = StorageClient.getInstance().bucket(firebaseBucket); // Firebase Storage 버킷에 접근

        Blob blob = null;
        try {
            // 파일을 Firebase Storage에 업로드합니다. 파일 이름과 바이트 배열, 콘텐츠 타입을 지정합니다.
            blob = bucket.create(nameFile, file.getBytes(), file.getContentType());
        } catch (Exception e) {
            log.error("파일 업로드 중 오류 발생", e);
            throw new RuntimeException("파일 읽기 오류입니다.", e);
        }

        // 업로드된 파일에 대해 공개 읽기 권한을 부여합니다.
        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

        // 업로드된 파일의 공개 URL을 반환합니다.
        return String.format("https://storage.googleapis.com/%s/%s", firebaseBucket, nameFile);
    }
}

