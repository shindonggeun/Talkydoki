#!/bin/bash

# MySQL 삭제
sudo apt purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
sudo rm -rf /etc/mysql /var/lib/mysql
sudo apt autoremove -y
sudo apt autoclean

# 패키지 목록 업데이트
sudo apt update

# MySQL 서버 패키지 설치
sudo apt install -y mysql-server

# MySQL 서버 실행
sudo systemctl start mysql

# 부팅 시 자동으로 MySQL 서버 시작 설정
sudo systemctl enable mysql

# MySQL 설정 변경
sudo cp ./mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# 추가 쿼리 실행
sudo mysql -u root -e "CREATE USER 'ssafy'@'%' IDENTIFIED BY 'ssafy';"
sudo mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO 'ssafy'@'%' WITH GRANT OPTION;"
sudo mysql -u root -e "CREATE DATABASE talkydoki;"

# MySQL 재시작
sudo service mysql restart
