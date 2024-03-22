# 패키지 호출
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from googletrans import Translator
import MeCab
import requests
import sys
import json
import warnings
from Url import API_URL
warnings.filterwarnings('ignore')
translator = Translator()

BASE_URL = "https://www3.nhk.or.jp/news"

# 카테고리 정보를 받아오기
cat_info = json.loads(sys.argv[1])
CAT_NAME = cat_info["CAT_NAME"]
CAT_URL = cat_info["CAT_URL"]

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

# Chrome WebDriver 설정
service = Service(ChromeDriverManager().install())
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")


# WebDriver 생성
driver = webdriver.Chrome(service=service, options=chrome_options)

# MeCab 초기화
mecab = MeCab.Tagger()

def morphological_analysis(text):# MeCab 실행 파일의 경로
    morphemes = mecab.parse(text)
    return morphemes

########## 뉴스 크롤링 ##########
print(f"{CAT_NAME} : 크롤링 시작\n")
# WebDriver를 사용하여 뉴스 카테고리에 접속
driver.get(f'{BASE_URL}{CAT_URL}')

# 대기 설정
wait = WebDriverWait(driver, 10)

# 뉴스 목록
news_urls = []
while not news_urls:
    news_list = wait.until(EC.presence_of_element_located((By.CLASS_NAME, CLASS_NAME_CONTENT_LIST)))
    # dt 태그 가져오기
    news_dt_list = news_list.find_elements(By.TAG_NAME, "dt")
    for news_dt in news_dt_list:
        # a 태그 가져오기
        news_a = news_dt.find_element(By.TAG_NAME, "a")
        # "overview"를 "table"로 교체
        news_urls.append(news_a.get_attribute("href"))

########## 뉴스 데이터 처리 ##########
for news_url in news_urls:
    # WebDriver를 사용하여 뉴스 카테고리에 접속
    driver.get(news_url)
    # 대기 설정
    news_wait = WebDriverWait(driver, 10)

    ########### 뉴스 타이틀 ###########
    news_title = news_wait.until(EC.presence_of_element_located((By.CLASS_NAME, CLASS_NAME_CONTENT_TITLE))).text
    news_title_translated = translator.translate(news_title, dest='ko', src='ja').text
    news_title_output = morphological_analysis(news_title)
    
    ########### 뉴스 미디어 ###########
    ########### 뉴스 썸네일 ###########
    news_body_img_urls = []
    try:
        news_thumb = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_THUMB)
        # img 태그 가져오기
        news_img = news_thumb.find_element(By.TAG_NAME, "img")
        # src 추출
        news_media_url = news_img.get_attribute("src")
        news_body_img_urls.append(news_media_url)
    except Exception as e:
        pass

    ########### 뉴스 비디오 ###########
    try:
        news_video = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_VIDEO)
        # iframe 태그 가져오기
        news_iframe = news_video.find_element(By.TAG_NAME, "iframe")
        # src 추출
        news_media_url = news_iframe.get_attribute("src")
    except Exception as e:
        pass

    ########### 뉴스 작성시간 ###########
    news_date = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_DATE).find_element(By.TAG_NAME, "time").text

    ########### 뉴스 요약 ###########
    news_summary = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_SUMMARY).text
    news_summary_translated = translator.translate(news_summary, dest='ko', src='ja').text
    news_summary_output = morphological_analysis(news_summary)

    ########### 뉴스 본문 ###########
    news_content_bodys = driver.find_elements(By.CLASS_NAME, CLASS_NAME_CONTENT_BODY)
    news_body = ''
    for news_content_body in news_content_bodys:
        # 뉴스 바디 타이틀
        try:
            news_body_title = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_TITLE)
            news_body += news_body_title
        except Exception as e:
            pass
        # 뉴스 바디 이미지
        try:
            news_body_img = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_IMG)
            # img 태그 가져오기
            news_body_img_tag = news_body_img.find_element(By.TAG_NAME, "img")
            # src 추출
            news_body_img_url = news_body_img_tag.get_attribute("src")
            news_body_img_urls.append(news_body_img_url)
        except Exception as e:
            pass
        # 뉴스 바디 텍스트
        try:
            news_body_text = news_content_body.find_element(By.CLASS_NAME, CLASS_NAME_BODY_TEXT).text
            news_body += news_body_text
        except Exception as e:
            pass

    # 뉴스 바디 출력
    try:
        news_body_translated = translator.translate(news_body, dest='ko', src='ja').text
    except TypeError as e:
        news_body_translated = ""

    news_body_output = morphological_analysis(news_body)

    news_data = {
        "title": news_title_output,
        "titleTranslated": news_title_translated,
        "category": CAT_NAME,
        "content": news_body_output,
        "contentTranslated": news_body_translated,
        "summary": news_summary_output,
        "summaryTranslated": news_summary_translated,
        "writeDate": news_date,
        "srcOrigin": news_url
    }
    newsId = requests.post(f'{API_URL}/post', json=news_data).json().get('dataBody')
    for imageUrl in news_body_img_urls:
        news_image_data = {
            "imageUrl": imageUrl,
            "newsId": newsId
        }
        requests.post(f'{API_URL}/images/post', json=news_image_data)
    



# 브라우저 닫기
driver.quit()
print(f"{CAT_NAME} : 크롤링 끝\n")