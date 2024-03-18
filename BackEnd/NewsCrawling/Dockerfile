# Python 이미지를 베이스로 사용
FROM python:3

# 작업 디렉토리 생성 및 설정
WORKDIR /usr/src/app

# MeCab 및 MeCab의 Python 바인딩 설치를 위한 종속성 설치
RUN apt-get update && \
    apt-get install -y mecab libmecab-dev mecab-ipadic-utf8 git make curl xz-utils file && \
    pip install mecab-python3

# 필요한 경우 requirements.txt 파일을 사용하여 패키지를 설치합니다.
COPY requirements.txt ./
RUN pip3 install --no-cache-dir -r requirements.txt

# 스크립트 파일을 컨테이너 내부로 복사
COPY NewsCrawling.py .
COPY NewsCrawling.sh .

# 스크립트 실행 권한 부여
RUN chmod +x NewsCrawling.sh

# 크론 작업을 추가합니다.
# 크론 작업을 정의하는 파일을 컨테이너 내부로 복사합니다.
COPY cronTab /etc/cron.d/cron-job

# 크론 작업 권한을 설정합니다.
RUN chmod 0644 /etc/cron.d/cron-job

# 크론 작업 실행 명령어를 추가합니다.
CMD ["cron", "-f"]
