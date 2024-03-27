#!/usr/bin/env python3
import sys
import re

current_document_id = None

japanese_regex = re.compile(r'[\u3040-\u30ff\u3400-\u4DBF\u4E00-\u9FFF]+')

for line in sys.stdin:
    line = line.strip()

    if not line:
        continue

    words = line.split()

    if words[0] == "ID":
        next_line = sys.stdin.readline().strip()
        document_id = next_line.split()[0]
        current_document_id = document_id
        continue

    if current_document_id is None:
        continue

    try:
        first_word = words[0]
        if not japanese_regex.match(first_word):
            raise ValueError("Not a Japanese word")

        print(f"{current_document_id}\t{first_word}\t1")

    except ValueError as e:
        continue