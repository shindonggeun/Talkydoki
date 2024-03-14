#!/usr/bin/env python3
import sys

current_word = None
current_count = 0
current_document_id = None

for line in sys.stdin:
    line = line.strip()
    document_id, word, count = line.strip().split('\t', 2)

    try:
        count = int(count)
    except ValueError as e:
        # 빈도수 변환 오류는 무시하고 계속 진행
        continue

    if current_word == word and current_document_id == document_id:
        current_count += count
    else:
        if current_word:
            # 현재 단어의 누적된 빈도수를 출력합니다.
            print(f"{current_document_id}\t{current_word}\t{current_count}")
        current_count = count
        current_document_id = document_id
        current_word = word

# 마지막 단어의 빈도수 출력
if current_word == word:
    print(f"{current_word}\t{current_count}")
