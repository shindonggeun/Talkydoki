package com.ssafy.backend.global.component.firebase.service;

import org.springframework.web.multipart.MultipartFile;

public interface FirebaseService {
    String uploadFiles(MultipartFile file, String nameFile);
}