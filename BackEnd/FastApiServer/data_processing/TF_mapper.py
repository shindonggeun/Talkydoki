#!/usr/bin/env python3
import sys

current_document_id = None

def is_japanese(character):
    # 일본어 문자 범위를 확인하여 일본어 여부 판단
    n = ord(character)
    if (0x3040 <= n <= 0x309F) or (0x30A0 <= n <= 0x30FF) or (0xFF66 <= n <= 0xFF9D) or (0x4E00 <= n <= 0x9FAF):
        return True
    return False

for line in sys.stdin:
    # 각 행을 공백으로 분리
    words = line.strip().split("\t")

    if line.startswith("ID :"):
        filtered_words = list(filter(None, [word.strip() for word in words]))
        if len(filtered_words) > 1:
            current_document_id = filtered_words[1]
        continue

    if line.strip() == "EOS" or line.startswith("CONTENT :"):
        continue

    # 첫 번째 단어가 존재하며, 일본어인지 확인
    if words and len(words[0]) > 0 and is_japanese(words[0][0]):
        print(f"{current_document_id}\t{words[0]}\t1")
