import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models.vocabulary import Vocabulary


# 데이터베이스 세션 의존성 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()


@router.post("/api/v2/crawling/start")
async def start_crawling(db: Session = Depends(get_db)):
    # Selenium 옵션 설정
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # 브라우저를 띄우지 않고 실행

    # Chrome WebDriver 설정
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 네이버 일본어 사전 JLPT N5 명사 페이지 URL
    url = "https://ja.dict.naver.com/#/jlpt/list?level=5&part=allClass&page=1"

    # 페이지 열기
    driver.get(url)

    # 페이지 로딩 대기
    driver.implicitly_wait(0.3)

    # 웹페이지의 동적 컨텐츠가 로드될 때까지 기다림
    rows = driver.find_elements(By.CSS_SELECTOR, "li.row")

    # 결과를 담을 리스트 초기화
    results = []

    # 각 'row' 요소에 대해 일본어와 한국어 뜻 추출
    for row in rows:
        # 일본어 -> 일본어 발음 (한문) 추출
        pronunciation = row.find_element(By.CSS_SELECTOR, 'a[lang="ja"]').text
        # 한국어 뜻 추출
        korean = row.find_element(By.CSS_SELECTOR, 'p.mean[lang="ko"]').text.strip()
        # 일본어 발음 (한문) -> 일본어 추출
        japanese = row.find_element(By.CSS_SELECTOR, 'span.pronunciation').text

        # 결과 리스트에 추가
        results.append({'japanese': japanese, 'korean': korean, 'pronunciation': pronunciation})

        # 콘솔에 결과 출력 (테스트용)
        print(f'일본어: {japanese} - 한국어: {korean} - 발음: {pronunciation}')

    # WebDriver 종료
    driver.quit()

    # 결과 데이터를 데이터베이스에 저장
    for item in results:
        # 품사 정보가 있는 경우와 없는 경우를 구분하여 처리
        word_class = None
        korean = item['korean']
        if (
                '명사' in korean or '대명사' in korean or '동사' in korean or
                '조사' in korean or '형용사' in korean or '접사' in korean or
                '부사' in korean or '감동사' in korean or '형용동사' in korean or
                '기타' in korean
        ):
            word_class = korean.split(' ')[0]  # 첫 번째 단어를 품사로 추정
            korean = ' '.join(korean.split(' ')[1:])  # 품사 정보를 제외한 나머지 텍스트

        # 일본어 단어에서 대괄호만 제거
        japanese = re.sub(r'\[|\]', '', item['japanese']).strip()

        # Vocabulary 인스턴스 생성
        new_vocabulary = Vocabulary(
            japanese=japanese,
            korean=korean,
            japanese_read=item['pronunciation'],
            type=word_class
        )

        # 데이터베이스 세션에 추가
        db.add(new_vocabulary)

    # 데이터베이스에 커밋
    db.commit()

    return {"detail": "데이터베이스에 저장되었습니다."}
