from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import FileResponse
from database import SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime
from models.news import News

import requests, os, paramiko

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
    filename = f"{save_path}/news_data_{datetime.now().strftime('%Y%m%d_%H')}.txt"
    local_filename = f"/home/ubuntu/data-processing/news_data_{datetime.now().strftime('%Y%m%d_%H')}.txt"
    with open(filename, "w", encoding="utf-8") as file:
        for news in news_data:
            file.write(f"ID\n{news.id}\nTITLE\n{news.title}\nSUMMARY\n{news.summary}\nCONTENT\n{news.content}\n")
    return local_filename

def copy_to_hdfs(local_path, hdfs_path="/input", ec2_ip="3.36.72.23", username="ubuntu", key_file="/app/data/J10C107T.pem"):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ec2_ip, username=username, key_filename=key_file)

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

def copy_from_hdfs(hdfs_path, local_path, ec2_ip="3.36.72.23", username="ubuntu", key_file="/app/data/J10C107T.pem"):
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(ec2_ip, username=username, key_filename=key_file)

    hadoop_command = "export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; " \
                     "export HADOOP_HOME=/usr/local/hadoop; " \
                     "export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; " \
                     f"hdfs dfs -copyToLocal {hdfs_path} {local_path}"
    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()  # Blocking call
    ssh.close()

    if exit_status == 0:
        print("Hadoop command executed successfully")
        return True
    else:
        print(f"Error executing Hadoop command: {stderr.read().decode()}")
        return False

def generate_output_path(base_path="/output"):
    timestamp = datetime.now().strftime("%Y%m%d_%H")
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

@router.get("/data-processing")
async def data_processing(db: Session = Depends(get_db)):
    # News Data를 파일에 저장하고 HDFS로 복사
    input_file = save_data(db)
    hdfs_input_path = copy_to_hdfs(input_file)
    if not start_hadoop_streaming(hdfs_input_path):
        return {"message": "News data fetched and copied to HDFS, but failed to start Hadoop Streaming job."}

    # HDFS에서 파일을 복사하고 일본어 추출 후 파일 저장
    base_path = "/output"
    today_str = datetime.now().strftime("%Y%m%d_%H")
    hdfs_input_path = os.path.join(base_path, today_str, "part-00000")
    local_filename = f"./data-processing/{today_str}_part-00000"
    if not copy_from_hdfs(hdfs_input_path, local_filename):
        raise Exception("Failed to copy file from HDFS")

    local_filename = f"/app/data/{today_str}_part-00000"
    try:
        with open(local_filename, "r", encoding="utf-8") as file:
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
    
    input_filename = "japanese.txt"
    if not os.path.exists(input_filename):
        raise HTTPException(status_code=404, detail="japanese.txt file not found")

    with open(input_filename, "r", encoding="utf-8") as file:
        for line in file:
            japanese = line.strip()
            keyword_data = {"japanese": japanese}
            try:
                response = requests.post(f'{API_URL}/api/v1/keywords/post', json=keyword_data)
                if response.status_code == 201:
                    print("Data successfully sent and saved")
            except Exception as e:
                print(f"Error while inserting keyword: {japanese}, Error: {str(e)}")
            
    try:
        with open(local_filename, "r", encoding="utf-8") as file:
            for line in file:
                parts = line.strip().split("\t")
                if len(parts) == 3:
                    news_id, japanese, weight = parts
                    data = {
                        "newsId": int(news_id),
                        "japanese": japanese,
                        "weight": float(weight)
                    }
                    try:
                        response = requests.post(f'{API_URL}/api/v1/keywords/weight', json=data)
                        if response.status_code == 201:
                            print("Data successfully sent and saved")
                    except:
                        print("Failed to send data")

    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(result_filename)