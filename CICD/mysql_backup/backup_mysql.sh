#!/bin/bash

# MySQL 접속 정보 설정
MYSQL_USER="ssafy"
MYSQL_PASSWORD="ssafy"
MYSQL_DATABASE="talkydoki"

# 백업 파일 경로 및 이름 설정
BACKUP_DIR="/home/ubuntu/mysql_backup"
BACKUP_FILE="$BACKUP_DIR/db_backup_$(date +%Y%m%d_%H%M%S).sql"

# MySQL 데이터베이스 백업 실행
mysqldump -u$MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE > $BACKUP_FILE


echo "MySQL 데이터베이스를 백업했습니다. 백업 파일: $BACKUP_FILE"