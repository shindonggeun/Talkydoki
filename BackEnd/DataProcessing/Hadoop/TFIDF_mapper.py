#!/usr/bin/env python3
import sys
import re

current_document_id = None

# 일본어 문자를 확인하기 위한 정규 표현식
japanese_regex = re.compile(r'[\u3040-\u30ff\u3400-\u4DBF\u4E00-\u9FFF]+')

for line in sys.stdin:
    line = line.strip()

    if not line:
        continue

    words = line.split()

     # 첫 번째 단어가 "ID"와 일치하면, 다음 라인에서 실제 문서 ID를 추출
    if words[0] == "&NEWSID&":
        # 다음 라인에서 실제 문서 ID를 추출
        next_line = sys.stdin.readline().strip()
        document_id = next_line.split()[0]  # 다음 라인의 첫 번째 단어가 문서 ID
        current_document_id = document_id
        continue

    # 만약 문서 ID가 없으면 이 레코드를 무시하고 다음 레코드로 계속 진행
    if current_document_id is None:
        continue

    try:
        # 첫 번째 단어가 일본어인지 확인
        first_word = words[0]
        if not japanese_regex.match(first_word):
            raise ValueError("Not a Japanese word")

        print(f"{current_document_id}\t{first_word}\t1")

    except ValueError as e:
        # 일본어가 아니면 예외 처리
        continue