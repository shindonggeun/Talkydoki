#!/bin/bash

# 중복된 크론탭 작업
DUPLICATE_CRON_JOB="/bin/bash /home/ubuntu/mysql_backup/backup_mysql.sh"

# 크론탭 설정 수정
crontab -l | grep -v "$DUPLICATE_CRON_JOB" | crontab -

echo "크론탭에서 중복된 작업을 제거했습니다."
