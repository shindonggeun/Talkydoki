  # 패키지 호출
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import MeCab
from collections import Counter
import re
import warnings
warnings.filterwarnings('ignore')

BASE_URL = "https://www3.nhk.or.jp/news"
CAT_URLS = [
    "/cat01.html", # 사회
    # "/saigai.html", # 기상.재해
    # "/cat03.html", # 과학.문화
    # "/cat04.html", # 정치
    # "/business.html", # 사업
    # "/cat06.html", # 국제
    # "/cat07.html", # 스포츠
    # "/cat02.html", # 생활
]
CLASS_NAME_CONTENT_LIST = "content--list"
CLASS_NAME_CONTENT_THUMB = "content--thumb"
CLASS_NAME_CONTENT_VIDEO = "content--video"
CLASS_NAME_CONTENT_TITLE = "content--title"
CLASS_NAME_CONTENT_DATE = "content--date"
CLASS_NAME_CONTENT_SUMMARY = "content--summary"
CLASS_NAME_CONTENT_BODY = "content--body"
CLASS_NAME_BODY_TITLE = "body-title"
CLASS_NAME_BODY_IMG = "body-img"
CLASS_NAME_BODY_TEXT = "body-text"

# ChromeOptions 설정
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument('--disable-dev-shm-usage')

columns = ['thumb_img_url', 'title', 'date', 'summary', 'body']

# WebDriver 생성
driver = webdriver.Chrome(options=chrome_options)

def morphological_analysis(text):
    mecab = MeCab.Tagger('')  # 형태소 분석을 위한 Tagger 초기화
    lines = mecab.parse(text).split('\n')  # 형태소 분석 후, 각 줄을 분리
    morphemes = list(map(lambda line: line.split('\t'), lines))
    return morphemes

########## 뉴스 크롤링 ##########

# WebDriver를 사용하여 뉴스 카테고리에 접속
driver.get(f'{BASE_URL}{CAT_URLS[0]}')

# 대기 설정
wait = WebDriverWait(driver, 10)

# 뉴스 목록
news_urls = []
news_list = wait.until(EC.presence_of_element_located((By.CLASS_NAME, CLASS_NAME_CONTENT_LIST)))
# dt 태그 가져오기
news_dt_list = news_list.find_elements(By.TAG_NAME, "dt")
for news_dt in news_dt_list:
    # a 태그 가져오기
    news_a = news_dt.find_element(By.TAG_NAME, "a")
    # "overview"를 "table"로 교체
    news_urls.append(news_a.get_attribute("href"))

# 뉴스 목록 출력
print(news_urls)

########## 뉴스 데이터 처리 ##########

# WebDriver를 사용하여 뉴스 카테고리에 접속
driver.get(news_urls[0])
# 대기 설정
news_wait = WebDriverWait(driver, 10)
# 뉴스 타이틀
news_title = news_wait.until(EC.presence_of_element_located((By.CLASS_NAME, CLASS_NAME_CONTENT_TITLE))).text
news_title_output = morphological_analysis(news_title)
print('news_title_output : ', news_title_output)
# 뉴스 썸네일
try:
    news_thumb = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_THUMB)
    # img 태그 가져오기
    news_img = news_thumb.find_element(By.TAG_NAME, "img")
    # src 추출
    news_thumb_url = news_img.get_attribute("src")
    print('news_thumb_url : ', news_thumb_url)
except Exception as e:
    print(f"Skipping {news_urls[0]} as {CLASS_NAME_CONTENT_THUMB} is not present.")
# 뉴스 비디오
try:
    news_video = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_VIDEO)
    # iframe 태그 가져오기
    news_iframe = news_video.find_element(By.TAG_NAME, "iframe")
    # src 추출
    news_video_url = news_iframe.get_attribute("src")
    print('news_video_url : ', news_video_url)
except Exception as e:
    print(f"Skipping {news_urls[0]} as {CLASS_NAME_CONTENT_VIDEO} is not present.")
# 뉴스 작성시간
news_date = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_DATE).find_element(By.TAG_NAME, "time").text
print('news_date : ', news_date)
# 뉴스 요약
news_summary = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_SUMMARY).text
news_summary_output = morphological_analysis(news_summary)
print('news_summary_output : ', news_summary_output)
# 뉴스 본문
news_content_bodys = driver.find_elements(By.CLASS_NAME, CLASS_NAME_CONTENT_BODY)
news_body = ''
news_body_img_urls = []
for news_content_body in news_content_bodys:
    # 뉴스 바디 타이틀
    try:
        news_body_title = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_TITLE)
        news_body += news_body_title
    except Exception as e:
        print(f"Skipping {news_content_body} as {CLASS_NAME_BODY_TITLE} is not present.")
    # 뉴스 바디 이미지
    try:
        news_body_img = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_IMG)
        # img 태그 가져오기
        news_body_img_tag = news_body_img.find_element(By.TAG_NAME, "img")
        # src 추출
        news_body_img_url = news_body_img_tag.get_attribute("src")
        news_body_img_urls.append(news_body_img_url)
    except Exception as e:
        print(f"Skipping {news_content_body} as {CLASS_NAME_BODY_IMG} is not present.")
    # 뉴스 바디 텍스트
    news_body_text = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_TEXT).text
    news_body += news_body_text

print('news_body_img_urls : ', news_body_img_urls)

# 키워드 추출
news_body_output = morphological_analysis(news_body)
print('news_body_output : ', news_body_output)

# 브라우저 닫기
driver.quit()