# 패키지 호출
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from webdriver_manager.chrome import ChromeDriverManager
from googletrans import Translator
from datetime import datetime
import MeCab
import requests
import json
import warnings
warnings.filterwarnings('ignore')
import os
import sys
sys.path.append('/usr/src/app')
from Url import NEWS_API_URL, DUPLICATENEWS_PATH
translator = Translator()

BASE_URL = "https://www3.nhk.or.jp/news"

# 카테고리 정보를 받아오기
cat_info = json.loads(sys.argv[1])
CAT_NAME = cat_info["CAT_NAME"]
CAT_URL = cat_info["CAT_URL"]

CSS_SELECTOR_BUTTON = "footer.module--footer.button-more p.button"
CSS_SELECTOR_BUTTON = "footer.module--footer.button-more p.button"
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
print(f"{CAT_NAME} : 크롤링 시작")
# WebDriver를 사용하여 뉴스 카테고리에 접속
driver.get(f'{BASE_URL}{CAT_URL}')

# 대기 설정
wait = WebDriverWait(driver, 10)

# # 버튼이 나타날 때까지 반복
# for _ in range(20):
#     try:
#         # 버튼이 나타날 때까지 대기 (10초)
#         button = WebDriverWait(driver, 10).until(
#             EC.presence_of_element_located((By.CSS_SELECTOR, CSS_SELECTOR_BUTTON))
#         )
        
#         # 요소로 스크롤하여 보이도록 이동
#         actions = ActionChains(driver)
#         actions.move_to_element(button).perform()
        
#         # 버튼 클릭
#         driver.execute_script("arguments[0].click();", button)

#     except Exception as e:
#         break
# # 버튼이 없을 경우 반복문 종료
# print("더보기 버튼이 더 이상 없습니다. 크롤링을 시작합니다.")

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
print("뉴스 목록 크롤링 끝")

########## 뉴스 데이터 처리 ##########
for news_url in news_urls:
    try:
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

        # ########### 뉴스 비디오 ###########
        # try:
        #     news_video = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_VIDEO)
        #     # iframe 태그 가져오기
        #     news_iframe = news_video.find_element(By.TAG_NAME, "iframe")
        #     # src 추출
        #     news_media_url = news_iframe.get_attribute("src")
        # except Exception as e:
        #     pass

        ########### 뉴스 작성시간 ###########
        news_date = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_DATE).find_element(By.TAG_NAME, "time").get_attribute("datetime")

        ########### 뉴스 요약 ###########
        news_summary = driver.find_element(By.CLASS_NAME, CLASS_NAME_CONTENT_SUMMARY).text
        news_summary_output = morphological_analysis(news_summary)

        news_summary_sentences = news_summary.split("。")
        news_summary_translated = translator.translate("\n\n\n".join(news_summary_sentences), dest='ko', src='ja').text

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
        news_body_output = morphological_analysis(news_body)

        news_body_sentences = news_body.split("。")
        news_body_translated = translator.translate("\n\n\n".join(news_body_sentences), dest='ko', src='ja').text

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
        newsId = requests.post(f'{NEWS_API_URL}/post', json=news_data).json().get('dataBody')
        if newsId is not None:
            for imageUrl in news_body_img_urls:
                news_image_data = {
                    "imageUrl": imageUrl,
                    "newsId": newsId
                }
                requests.post(f'{NEWS_API_URL}/images/post', json=news_image_data)
            
            news_datetime = datetime.fromisoformat(news_date)
            newsdate = news_datetime.strftime('%Y%m%d')
            filename = f"{DUPLICATENEWS_PATH}/news_data_{newsdate}.json"
            # 기존의 JSON 파일 불러오기
            existing_news_data = []
            if os.path.exists(filename):
                with open(filename, "r", encoding="utf-8") as file:
                    existing_news_data = json.load(file)
            news_hadoop_data = {
                "newsId": newsId,
                "title": news_title_output,
                "content": news_body_output,
                "summary": news_summary_output
            }
            existing_news_data.append(news_hadoop_data)
            # 폴더가 없는 경우 폴더를 생성
            os.makedirs(os.path.dirname(filename), exist_ok=True)
            with open(filename, "w", encoding="utf-8") as file:
                json.dump(existing_news_data, file, ensure_ascii=False, indent=4)
    except Exception as e:
        pass
    



# 브라우저 닫기
driver.quit()
print(f"{CAT_NAME} : 크롤링 끝")