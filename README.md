# Talkydoki (빅데이터 분산 프로젝트)

## ✨ 프로젝트 개요

### 1. 프로젝트명

토키도키(Talkydoki)

### 2. 프로젝트 기간

2024.02.26 ~ 2024.04.05(6주)

### 3. 프로젝트 주제

일본어 회화 학습 플랫폼

### 4. 서비스 타겟층

일상적인 일본어를 배우고 싶은 사람들

### 5. 프로젝트 주요 기능

#### 📰 뉴스

- 오늘의 뉴스
  - 사용자의 학습 데이터를 바탕으로 개인에게 맞춤화된 뉴스를 추천
  - 신규 가입자나 아직 데이터가 축적되지 않은 사용자의 경우, 다른 사용자들에게 추천이 많이 된 뉴스를 추천
- 뉴스 조회
  - 다양한 카테고리별 최신 순으로 뉴스 목록 제공
  - 뉴스 조회 시 TTS를 통해 뉴스 컨텐츠 듣기
  - 뉴스 내 중요 단어 표시 기능을 통한 단어 학습 기능
- 뉴스 쉐도잉
  - 뉴스 조회 시 읽기 모드와 학습 모드 선택
  - 학습 모드 시 뉴스 문장의 발음을 듣고 따라 하면서 쉐도잉을 연습
  - 사용자의 발음 정확도 평가
  - 사용자의 녹음과 원어민 발음을 비교하면서 듣기 기능

#### 💬 AI 회화 연습

- 테마 별 회화
  - 일상 생활에서 마주칠 수 있는 다양한 상황(식당, 편의점, 호텔 등)을 테마로 선택하여 AI와 실전 회화 연습
- 모범 답안 제공
  - 사용자가 상황에 맞는 자연스러운 대화를 할 수 있도록, AI 튜터가 사용자에게 모범 답안 제공
- 회화 리포트
  - AI와 회화 연습 후, 회화 내용의 요약본과 함께 사용자의 회화 실력을 평가한 리포트를 제공하여 학습 효과를 극대화

#### 📝 사용자 분석

- 나의 학습 진도
  - 매일 학습 진행량에 따라 색이 변화하는 잔디 표시 기능을 통해 사용자에게 학습 진도에 대한 명확한 시각화와 성취감을 제공
- 쉐도잉 점수 비교
  - 사용자가 매일 기록한 쉐도잉 평균 점수와 다른 사용자들의 평균 점수를 비교해 보여주는 그래프를 통해, 자신의 실력을 객관적으로 확인하고 동기 부여 제공
- 나의 단어장
  - 학습 중 사용자가 모르는 단어를 나만의 단어장에 저장하고, 언제든지 확인하여 학습할 수 있는 기능 제공

## ✏️ 기술 특이점

### 뉴스 데이터 크롤링

### 자연어 처리(NLP) 기술

- 자연어 처리 기술을 활용하여 일본어 뉴스 데이터 형태소 분석 및 처리 진행

### 빅데이터 분산 기술

- Hadoop을 통한 뉴스 데이터 분산 처리
  - 뉴스 크롤링 후, AWS EC2 서버에서 Hadoop Streaming을 사용하여 뉴스 데이터 내 단어의 TF-IDF 값 계산
  - 기사 내 단어에 대한 WordCount 계산 후 그에 기반하여 TF-IDF 값을 도출하는 MapReduce 과정 수행
  - 각 기사에서 TF-IDF 값이 높은 상위 5개의 단어를 선별하여 뉴스를 조회할 때 중요 단어 표시 기능 제공

### 빅데이터 추천 기술

- Content-Based Filtering Algorithm
  - 사용자의 선호도를 반영하여 선호하는 카테고리의 단어에 대해 더 많은 학습을 진행하는 사용자 더미 데이터 300개 생성
  - 사용자가 학습한 단어 횟수 데이터와 뉴스 - 단어의 TF-IDF 데이터를 이용하여 Cosine Similartiy 계산
  - Cosine Similarity를 기준으로, 사용자와 가장 관련성이 높은 상위 3개의 뉴스 추천
  - 신규 사용자나 데이터가 없는 사용자를 위해, 다른 사용자들에게 가장 많이 추천된 상위 3개의 뉴스를 추천하는 대체 알고리즘 구현을 통해 Content-Based Filtering Algorithm의 단점인 Cold-Start 문제 해결

### TTS / STT 기술

- TTS(Text-to-Speech)를 통해 사용자가 뉴스를 들을 수 있는 기능 제공
- STT(Speech-to-Text)를 통해 사용자의 음성을 텍스트로 변환 후 쉐도잉 평가 기능과 AI와의 회화 기능 제공

### 뉴스 쉐도잉 평가

- 레벤슈타인 거리 알고리즘(Levenshtein Distance)
  - 문자열의 유사도를 검사하는 알고리즘인 레벤슈타인 거리 알고리즘을 활용하여 사용자 녹음 Text와 뉴스 원문을 비교하여 유사도 계산

### OpenAI API

## ✨ 서비스 화면

인트로화면

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/8762558d-1a59-4bc5-8245-86bfbea43228" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/db805fa2-c740-44fd-a9a9-196ce495f432" width="20%">
</div>
메인화면
<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/0655af22-7f2d-4d88-a8c4-9b0553f7b23d" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/d3be5517-91b5-437c-9808-e31dad122c9b" width="20%">
</div>

뉴스 리스트

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/6b546cbc-48ad-49e4-b41c-d754cfaeb580" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/88ddea47-b9af-444a-a1a5-168848db9fd2" width="20%">
</div>

뉴스 디테일

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/5794b60c-69ac-4100-94cf-08145dc79f45" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/857ed6db-61b9-49b1-8f67-81713ea0c2ef" width="20%">
</div>

뉴스 학습모드

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/7e525e3c-b247-473a-8561-b8903ae32fe6" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/4a43ceb2-7409-4fb3-ada4-0f8242d24956" width="20%">
</div>

채팅 디테일

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/611b1b63-524c-470b-86ae-13026a324771" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/870e5f46-373e-4e26-bd0d-22d9f06c2308" width="20%">
</div>
채팅레포트
<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/09745b25-2bc4-40a2-9531-a3d688908de9" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/4ece02c6-3c9b-48e7-8c96-7649b9b27a19" width="20%">
</div>

마이데이터

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/13816b75-f0cd-4d1a-85c3-eec1f0fe9359" width="75%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/0974c960-50fd-42fa-8937-dbeab52557ac" width="20%">
</div>

소셜로그인

<div width="100%">
<img src="https://github.com/gisun55555/reactshop2/assets/139519062/04635180-8679-4378-a36c-faf10a4c6bc8" width="100%">
</div>

## 🚀 기술 스택

### Front-End

- React
- Typescript

### Back-End

- Java `17.0.10`
- Spring Boot `3.2.3`
- Gradle `8.5`
- Spring Security
- WebSocket
- STOMP
- RabbitMQ
- Python `3.8.10`
- FastAPI `0.110.0`

### DB

- MySQL
- Redis

### Infra

- AWS EC2
- Ubuntu `20.04.6 LTS`
- Nginx
- Docker `25.0.4`
- Jenkins `2.448`

### Data

- selenium `4.18.1`
- Hadoop `3.3.6`
- Crontab
- Mecab
- scikit-learn `1.4.1`

## 기능 명세

[기능 명세](https://www.notion.so/3754b9a4e4bf49519f1c5eab99fe4415?pvs=4)

## API 명세
[API 명세](https://translucent-polish-c76.notion.site/API-9e9953ecc90f492f9efed251e04c6f49?pvs=4)

## ERD

![ERD](./exec/C107_ERD.png)

## System Architecture

![System Architecture](./exec/C107_System_Architecture.png)

## 역할 분담

| 이름   | 역할               | 업무                                                                       |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| 송강산 | 팀장, BE, FE, Data |                                                                            |
| 백민정 | FE                 |                                                                            |
| 신동근 | BE, FE             |                                                                            |
| 오기선 | FE                 |                                                                            |
| 이지호 | BE, Data           | CI/CD(Hadoop Server), 뉴스 데이터 분산 처리, 뉴스 / 단어 추천, 뉴스 쉐도잉 |
| 조현호 | BE                 |                                                                            |
