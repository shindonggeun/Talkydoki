#!/usr/bin/env python3
import sys
import math

word_count_per_document = {}
document_frequency = {}
total_documents = 0
current_document_id = None
words_in_current_document = set()

for line in sys.stdin:
    line = line.strip()
    document_id, word, count = line.split('\t', 2)
    count = int(count)

    if current_document_id != document_id:
        total_documents += 1
        current_document_id = document_id
        words_in_current_document.clear()

    if document_id not in word_count_per_document:
        word_count_per_document[document_id] = {}

    if word not in word_count_per_document[document_id]:
        word_count_per_document[document_id][word] = 0

    word_count_per_document[document_id][word] += count

    if word not in words_in_current_document:
        if word not in document_frequency:
            document_frequency[word] = 0
        document_frequency[word] += 1
        words_in_current_document.add(word)

for document_id in word_count_per_document:
    total_words_in_document = sum(word_count_per_document[document_id].values())
    for word in word_count_per_document[document_id]:
        tf = word_count_per_document[document_id][word] / total_words_in_document
        idf = math.log((total_documents + 1) / (document_frequency[word] + 1))
        tf_idf = tf * idf
        print(f"{document_id}\t{word}\t{tf_idf:.6f}")
