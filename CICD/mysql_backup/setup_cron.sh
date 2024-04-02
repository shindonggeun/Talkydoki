#!/bin/bash

# 크론탭 설치 여부 확인
CRON_INSTALLED=$(dpkg-query -W -f='${Status}' cron 2>/dev/null | grep -c "ok installed")

# 크론탭이 설치되어 있지 않다면 설치
if [ $CRON_INSTALLED -eq 0 ]; then
    sudo apt-get update
    sudo apt-get install cron -y
    echo "크론탭을 설치했습니다."
else
    echo "크론탭이 이미 설치되어 있습니다."
fi

# 크론탭 작업 추가
(crontab -l ; echo "30 * * * * /bin/bash /home/ubuntu/mysql_backup/backup_mysql.sh") | crontab -

echo "크론탭 작업을 설정했습니다. 매일 자정에 MySQL 데이터베이스가 백업됩니다."