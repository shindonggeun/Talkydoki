#!/bin/bash

# PATH 설정 (selenium과 관련된 패키지가 있는 경로)
export PATH=/usr/local/bin:$PATH

# 카테고리 정보 설정
CAT=(
    '{"CAT_NAME": "SOCIETY","CAT_URL": "/cat01.html"}'
    '{"CAT_NAME": "WEATHER_DISASTER","CAT_URL": "/saigai.html"}'
    '{"CAT_NAME": "SCIENCE_CULTURE","CAT_URL": "/cat03.html"}'
    '{"CAT_NAME": "POLITICS","CAT_URL": "/cat04.html"}'
    '{"CAT_NAME": "BUSINESS","CAT_URL": "/business.html"}'
    '{"CAT_NAME": "INTERNATIONAL","CAT_URL": "/cat06.html"}'
    '{"CAT_NAME": "SPORTS","CAT_URL": "/cat07.html"}'
    '{"CAT_NAME": "LIFE","CAT_URL": "/cat02.html"}'
)

# Python 스크립트 실행
for cat_info in "${CAT[@]}"; do
    while true; do
        python3 /usr/src/app/NewsCrawling.py "$cat_info"
        if [ $? -eq 0 ]; then
            break
        else
            echo "An error occurred. Retrying..."
            sleep 1  # 1초 후 재시도
        fi
    done
done

python3 /usr/src/app/GetHadoop.py

# 매 시간 0분마다 /bin/bash를 사용하여 /usr/src/app/NewsCrawling.sh 스크립트를 실행
# 0 * * * * /bin/bash /usr/src/app/NewsCrawling.sh


