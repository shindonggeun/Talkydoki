#!/usr/bin/env python3
import sys

def clean_word(word):
    # 단어에서 구두점을 제거하고 소문자로 변환하는 함수
    return word.strip(",.!?;:\"'()").lower()

for line in sys.stdin:
    # 입력으로부터 한 줄씩 읽음
    line = line.strip()
    # 제목, 내용, 요약을 공백으로 구분하여 단어로 나눈다.
    words = line.split()
    for word in words:
        cleaned_word = clean_word(word)
        # 비어있지 않은 단어만 처리
        if cleaned_word:
            print(f"{cleaned_word}\t1")