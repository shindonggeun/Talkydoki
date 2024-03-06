import re
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from fastapi import APIRouter, Depends, Path
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models.vocabulary import Vocabulary
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# 데이터베이스 세션 의존성 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

router = APIRouter()


@router.post("/api/v2/crawling/start/{level}/{lastPage}")
async def start_crawling(level: int = Path(),
                         lastPage: int = Path(),
                         db: Session = Depends(get_db)):
    # Chrome WebDriver 설정
    service = Service(ChromeDriverManager().install())
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 각 페이지를 반복
    for page in range(1, lastPage+1):
        # 페이지 URL 업데이트
        url = f"https://ja.dict.naver.com/#/jlpt/list?level={level}&part=allClass&page={page}"

        # 페이지 열기
        driver.get(url)

        # 요소가 로드될 때까지 대기
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, "li.row")))

        # 웹페이지의 동적 컨텐츠가 로드될 때까지 기다림
        rows = driver.find_elements(By.CSS_SELECTOR, "li.row")

        # 각 'row' 요소에 대해 일본어와 한국어 뜻 추출
        for row in rows:
            # 일본어 발음 (한문) 추출
            japanese_read = row.find_element(By.CSS_SELECTOR, 'a[lang="ja"]').text
            # 한국어 뜻 추출
            korean = row.find_element(By.CSS_SELECTOR, 'p.mean[lang="ko"]').text.strip()
            # 일본어 추출 (여기서 정규식을 사용하여 필요한 처리를 합니다)
            japanese = re.sub(r'\[|\]', '', row.find_element(By.CSS_SELECTOR, 'span.pronunciation').text).strip()

            # 품사 정보가 있는 경우와 없는 경우를 구분하여 처리
            word_class = None
            if (
                    '명사' in korean or '대명사' in korean or '동사' in korean or
                    '조사' in korean or '형용사' in korean or '접사' in korean or
                    '부사' in korean or '감동사' in korean or '형용동사' in korean or
                    '기타' in korean
            ):
                word_class = korean.split(' ')[0]
                korean = ' '.join(korean.split(' ')[1:])

            # Vocabulary 인스턴스 생성 및 데이터베이스 세션에 추가
            new_vocabulary = Vocabulary(
                japanese=japanese,
                korean=korean,
                japanese_read=japanese_read,
                type=word_class
            )
            db.add(new_vocabulary)

        # 페이지별로 커밋
        db.commit()

    # WebDriver 종료
    driver.quit()

    return {"detail": "모든 페이지에서 데이터베이스에 저장되었습니다."}
