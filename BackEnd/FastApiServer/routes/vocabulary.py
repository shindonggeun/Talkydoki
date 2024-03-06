from fastapi import APIRouter, HTTPException
from bs4 import BeautifulSoup
import requests

router = APIRouter()

@router.post("/api/v2/crawling/start")
async def start_crawling():
    # 네이버 일본어 사전 JLPT N5 명사 페이지 URL
    url = "https://ja.dict.naver.com/#/jlpt/list?level=5&part=noun&page=1"

    # 페이지 가져오기
    response = requests.get(url)
    response.raise_for_status()  # 응답 오류시 예외 발생

    # BeautifulSoup 객체 생성
    soup = BeautifulSoup(response.text, 'html.parser')

    # 모든 'row' 클래스를 가진 li 태그 찾기
    rows = soup.find_all('li', class_='row')

    # 결과를 담을 리스트 초기화
    results = []

    print(rows)

    # 각 'row' 요소에 대해 일본어와 한국어 뜻 추출
    for row in rows:
        # 일본어 단어 추출
        japanese = row.find('a', lang='ja').text
        # 한국어 뜻 추출
        korean = row.find('p', {'class': 'mean', 'lang': 'ko'}).text.strip()

        # 결과 리스트에 추가
        results.append({'japanese': japanese, 'korean': korean})

        # 콘솔에 결과 출력 (테스트용)
        print(f'일본어: {japanese} - 한국어: {korean}')

    # 결과 반환 (이 경우 콘솔 출력만 필요하므로 실제 반환값은 없음)
    return {"detail": "크롤링이 완료되었습니다."}
