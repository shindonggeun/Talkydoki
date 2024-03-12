package com.ssafy.backend.global.component.firebase.controller;

import com.ssafy.backend.global.common.dto.Message;
import com.ssafy.backend.global.component.firebase.service.FirebaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "파이어베이스", description = "파이어베이스 관련 API 입니다.")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/firebase")
public class FirebaseController {
    private final FirebaseService firebaseService;

    @Operation(
            summary = "이미지 파일 업로드",
            description = "이미지 파일을 파이어베이스 스토리지에 업로드 합니다."
    )
    @PostMapping("/upload")
    public ResponseEntity<Message<String>> uploadFile(@RequestParam("file") MultipartFile file,
                                                      @RequestParam("fileName") String fileName) {
        String url = firebaseService.uploadFiles(file, fileName);
        return ResponseEntity.ok().body(Message.success(url));
    }

}

