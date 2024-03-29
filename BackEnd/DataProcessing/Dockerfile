# Python 이미지를 베이스로 사용
FROM python:3

# 작업 디렉토리 생성 및 설정
WORKDIR /usr/src/app

# 필요한 경우 requirements.txt 파일을 사용하여 패키지를 설치합니다.
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip3 install selenium

# MeCab 및 관련 패키지 설치
RUN apt-get update && apt-get -q -y install file mecab libmecab-dev mecab-ipadic-utf8 git curl python3-mecab
RUN pip3 install mecab-python3
RUN pip3 install unidic-lite
RUN pip3 install paramiko
RUN pip3 install pytz

# Chrome 및 ChromeDriver 설치
RUN apt-get update && apt-get install -y wget
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -y google-chrome-stable

# ChromeDriver 다운로드 및 설치
RUN python -c "from webdriver_manager.chrome import ChromeDriverManager; ChromeDriverManager().install()"

# 크론 서비스 설치 및 크론 작업 추가
RUN apt-get -y install cron
COPY crontab /etc/cron.d/cronjob
RUN chmod 0644 /etc/cron.d/cronjob
RUN crontab /etc/cron.d/cronjob

# 모든 파일을 컨테이너 내부로 복사
COPY . .

# 스크립트 실행 권한 부여
RUN chmod +x /usr/src/app/DataProcessing.sh
RUN /usr/src/app/DataProcessing.sh


# 크론 작업 실행 명령어를 추가합니다.
CMD ["cron", "-f"]
