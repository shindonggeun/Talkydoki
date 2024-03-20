from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import FileResponse
from database import SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
from models.news import News

import requests, subprocess, os, paramiko

router = APIRouter()

API_URL = "http://j10c107.p.ssafy.io:8080"

# 데이터베이스 세션 생성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_news(db: Session):
    return db.query(News.id, News.title, News.content, News.summary).all()

def save_data(db: Session):
    news_data = get_news(db)
    save_path = '/app/data'
    filename = f"{save_path}/news_data_{datetime.now().strftime('%Y%m%d')}.txt"
    with open(filename, "w", encoding="utf-8") as file:
        for news in news_data:
            file.write(f"ID\n{news.id}\nTITLE\n{news.title}\nSUMMARY\n{news.summary}\nCONTENT\n{news.content}\n")
    return filename

def copy_to_hdfs(local_path, hdfs_path="/input", ec2_ip="3.36.72.23", username="ubuntu", key_file="/app/data/J10C107T.pem"):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ec2_ip, username=username, key_filename=key_file)
    
    sftp = ssh.open_sftp()
    remote_path = f"/tmp/{os.path.basename(local_path)}"
    sftp.put(local_path, remote_path)
    sftp.close()

    hadoop_command = "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; " \
                    "export HADOOP_HOME=/usr/local/hadoop; " \
                    "export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; " \
                    f"hdfs dfs -put {local_path} {hdfs_path}"
    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()  # Blocking call
    ssh.close()

    if exit_status == 0:
        print("Hadoop command executed successfully")
        return os.path.join(hdfs_path, os.path.basename(local_path))
    else:
        print(f"Error executing Hadoop command: {stderr.read().decode()}")
        return False

def generate_output_path(base_path="/output"):
    timestamp = datetime.now().strftime("%Y%m%d")
    return f"{base_path}/{timestamp}"

def start_hadoop_streaming(input_path, ec2_ip="3.36.72.23", username="ubuntu", key_file="/app/data/J10C107T.pem"):
    output_path = generate_output_path()
    hadoop_command = "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; " \
                    "export HADOOP_HOME=/usr/local/hadoop; " \
                    "export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; " \
                    f"hadoop jar /usr/local/hadoop/share/hadoop/tools/lib/hadoop-streaming-*.jar -files /home/ubuntu/data-processing/TFIDF_mapper.py,/home/ubuntu/data-processing/TFIDF_reducer.py -mapper 'python3 /home/ubuntu/data-processing/TFIDF_mapper.py' -reducer 'python3 /home/ubuntu/data-processing/TFIDF_reducer.py' -input {input_path} -output {output_path}"

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ec2_ip, username=username, key_filename=key_file)
    
    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()  # Blocking call
    ssh.close()

    if exit_status == 0:
        print("Hadoop Streaming job executed successfully")
        return True
    else:
        print(f"Error executing Hadoop Streaming job: {stderr.read().decode()}")
        return False


@router.get("/fetch-news")
async def fetch_news_to_file(db: Session = Depends(get_db)):
    input_file = save_data(db)
    hdfs_input_path = copy_to_hdfs(input_file)
    if start_hadoop_streaming(hdfs_input_path):
        message = "News data fetched and copied to HDFS successfully. Hadoop Streaming job started successfully!"
        # await extract_japanese()
    else:
        message = "News data fetched and copied to HDFS, but failed to start Hadoop Streaming job."
    
    return {"message": message}

@router.get("/extract-japanese")
async def extract_japanese():
    base_path = "output"
    today_str = datetime.now().strftime("%Y%m%d")
    input_path = os.path.join(base_path, today_str, "part-00000")
    
    if not os.path.exists(input_path):
        raise HTTPException(status_code=404, detail="Result file not found for today.")

    try:
        with open(input_path, "r", encoding="utf-8") as file:
            content = file.readlines()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    
    unique_words = set()
    for line in content:
        words = line.split()
        if len(words) > 2:
            japanese_word = words[1]
            unique_words.add(japanese_word)
    
    result_filename = "japanese.txt"
    with open(result_filename, "w", encoding="utf-8") as file:
        for word in sorted(unique_words):
            file.write(word + "\n")
    
    await upload_keywords()
    return FileResponse(result_filename)


@router.get("/upload-keywords")
async def upload_keywords():
    input_filename = "japanese.txt"
    if not os.path.exists(input_filename):
        raise HTTPException(status_code=404, detail="japanese.txt file not found")

    failed_keywords = []  # 실패한 키워드를 추적하기 위한 리스트
    try:
        with open(input_filename, "r", encoding="utf-8") as file:
            for line in file:
                japanese = line.strip()
                keyword_data = {"japanese": japanese}
                try:
                    response = requests.post(f'{API_URL}/api/v1/keywords/post', json=keyword_data)
                    if response.status_code != 200:
                        failed_keywords.append(japanese)
                except Exception as e:
                    failed_keywords.append(japanese)
                    print(f"Error while inserting keyword: {japanese}, Error: {str(e)}")
                
        if failed_keywords:
            return {
                "message": "Some keywords failed to be inserted.",
                "failed_keywords": failed_keywords,
                "failed_count": len(failed_keywords)
            }
        return {"message": "All keywords were successfully inserted."}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")