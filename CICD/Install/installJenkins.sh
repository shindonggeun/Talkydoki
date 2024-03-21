#!/bin/bash

# Jenkins 폴더 생성
JENKINS_DIR="./jenkins"
if [ ! -d "$JENKINS_DIR" ]; then
    mkdir "$JENKINS_DIR"
fi

# Docker Compose 실행
docker-compose up -d

# Jenkins 컨테이너가 완전히 실행될 때까지 대기
sudo sleep 60

# Jenkins 폴더로 이동
cd ./jenkins

# Jenkins 폴더가 완전히 생성될 때까지 대기
sudo sleep 60

# update center에 필요한 CA 파일 다운로드
UPDATE_CENTER_DIR="./update-center-rootCAs"
if [ ! -d "$UPDATE_CENTER_DIR" ]; then
    mkdir "$UPDATE_CENTER_DIR"
fi

sudo wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O "$UPDATE_CENTER_DIR/update-center.crt"

# Jenkins 설정 파일 수정
sudo sed -i 's#https://updates.jenkins.io/update-center.json#https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json#' ./hudson.model.UpdateCenter.xml

# Jenkins 재시작 (필수)
docker restart jenkins
