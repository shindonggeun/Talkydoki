#!/bin/bash

# python 설치
sudo apt-get update
sudo apt-get install python3

# selenium 설치
pip3 install selenium

# webdriver_manager 설치
pip3 install webdriver_manager

pip3 install mecab-python3

sudo apt-get -q -y install sudo file mecab libmecab-dev mecab-ipadic-utf8 git curl python-mecab
pip3 install unidic-lite

sudo locale-gen ja_JP.UTF-8
sudo update-locale

pip3 install pandas

pip3 install pyarrow

pip3 install fastparquet
