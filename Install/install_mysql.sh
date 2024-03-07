#!/bin/bash

# MySQL 설치 스크립트

# 패키지 목록 업데이트
sudo apt update

# MySQL 서버 패키지 설치
sudo apt install mysql-server -y

# MySQL 서버 실행
sudo systemctl start mysql

# 부팅 시 자동으로 MySQL 서버 시작 설정
sudo systemctl enable mysql

# MySQL 루트 비밀번호 설정
sudo mysql_secure_installation

# MySQL 설정 변경
sudo cp ./mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf

# 추가 쿼리 실행
sudo mysql -u root -p -e "create user 'root'@'%' identified by 'tttt';"
sudo mysql -u root -p -e "grant all privileges on *.* to 'root'@'%' with grant option;"

# MySQL 재시작
sudo service mysql restart