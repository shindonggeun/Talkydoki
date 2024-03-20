# 공식 Python 런타임 이미지를 사용합니다
FROM python:3.10-slim

# 환경 변수 설정
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV HADOOP_VERSION=3.3.6
ENV HADOOP_HOME=/usr/local/hadoop
ENV PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin

# 필요한 패키지 설치 및 Hadoop 클라이언트 다운로드 및 설치
RUN apt-get update && apt-get install -y wget ssh pdsh \
    && wget https://downloads.apache.org/hadoop/common/hadoop-$HADOOP_VERSION/hadoop-$HADOOP_VERSION.tar.gz \
    && tar -xzvf hadoop-$HADOOP_VERSION.tar.gz -C /usr/local/ \
    && mv /usr/local/hadoop-$HADOOP_VERSION $HADOOP_HOME \
    && rm hadoop-$HADOOP_VERSION.tar.gz \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 컨테이너 내에서 작업 디렉토리를 설정합니다
WORKDIR /app

# 현재 디렉토리의 내용을 컨테이너 내의 /app 디렉토리로 복사합니다
COPY . /app

# requirements.txt에 명시된 필요한 패키지를 설치합니다
RUN pip install --no-cache-dir -r requirements.txt

# 앱이 실행되는 포트를 노출합니다
EXPOSE 8000

# 환경 변수를 정의합니다
ENV FASTAPI_ENV production

# 애플리케이션을 실행하는 명령어를 정의합니다
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
