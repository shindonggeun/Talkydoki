#!/usr/bin/env python3

import sys
from collections import defaultdict

current_word = None
current_count = 0
word = None

# 단어와 빈도수를 저장할 Dictionary
word_count = defaultdict(int)

for line in sys.stdin:
    line = line.strip()
    word, count = line.split('\t', 1)

    try:
        count = int(count)
    except ValueError:
        continue

    if current_word == word:
        current_count += count
    else:
        if current_word:
            # 현재 단어의 빈도수 출력
            word_count[current_word] = current_count
        current_count = count
        current_word = word

# 마지막 단어 출력
if current_word == word:
    word_count[current_word] = current_count

# 단어 빈도수 출력
for word, count in word_count.items():
    print(f"{word}\t{count}")