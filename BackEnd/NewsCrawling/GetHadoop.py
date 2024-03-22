import requests

FAST_API_URL = "http://j10c107a.p.ssafy.io:8000"

requests.get(f'{FAST_API_URL}/data-processing')
print("Hadoop Done\n")