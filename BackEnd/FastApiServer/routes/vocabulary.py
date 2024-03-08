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


@router.post("/api/v2/crawling/start/{level}/{startPage}/{lastPage}")
async def start_crawling(level: int = Path(),
                         startPage: int = Path(),
                         lastPage: int = Path(),
                         db: Session = Depends(get_db)):
    # Chrome WebDriver 설정
    service = Service(ChromeDriverManager().install())
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=chrome_options)

    # 각 페이지를 반복
    for page in range(startPage, lastPage + 1):
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
            try:
                # 일본어 발음 (한문) 추출
                japanese_read_element = row.find_element(By.CSS_SELECTOR, 'a[lang="ja"]')
                japanese_read = japanese_read_element.text if japanese_read_element else None

                # 한국어 뜻 추출
                korean = row.find_element(By.CSS_SELECTOR, 'p.mean[lang="ko"]').text.strip()

                # 일본어 추출
                japanese_elements = row.find_elements(By.CSS_SELECTOR, 'span.pronunciation')
                japanese = re.sub(r'\[|\]', '', japanese_elements[0].text).strip() if japanese_elements else None

                # 품사 추출
                word_class_elements = row.find_elements(By.CSS_SELECTOR, 'span.word_class')
                word_class = word_class_elements[0].text.strip() if word_class_elements else None

                # print(korean)

                # 품사가 None이 아닌 경우
                if word_class:
                    # 한국어 앞에 품사 붙어 있는 것들 처리
                    korean = re.sub(r'\b{}\b'.format(word_class), '', korean)
                    korean = ' '.join(korean.split()).strip()

                print(f'페이지: {page} - 일본어:  {japanese} - 품사: {word_class} - 한국어: {korean} - 일본어 발읍: {japanese_read}')

                # 일본어가 None이 아닐 경우에만 데이터베이스에 저장
                if japanese:
                    new_vocabulary = Vocabulary(
                        japanese=japanese,
                        korean=korean,
                        japanese_read=japanese_read,
                        type=word_class
                    )
                    db.add(new_vocabulary)

            except Exception as e:
                # 에러 로깅 및 에러 발생한 row 건너뛰기
                print(f"Error processing row: {e}")

        # 페이지별로 커밋
        db.commit()

    # WebDriver 종료
    driver.quit()

    return {"detail": "모든 페이지에서 데이터베이스에 저장되었습니다."}
