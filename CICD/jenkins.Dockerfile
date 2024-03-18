# 공식 Jenkins 이미지를 기본 이미지로 사용
FROM jenkins/jenkins:latest

# 추가 패키지를 설치하기 위해 root 사용자로 전환
USER root

# 의존성 설치 (업데이트, Docker 설치, Docker Compose 설치)
RUN apt-get update \
    && apt-get install -y docker.io \
    && curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose \
    && chmod +x /usr/local/bin/docker-compose

# Jenkins 사용자로 전환
USER jenkins