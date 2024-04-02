import os, paramiko
import pytz
from datetime import datetime, timedelta
from Url import DAYS_NEWS_PATH, DOCKER_INPUT_PATH, DOCKER_OUTPUT_PATH,TF_IDF_BASE_NAME, LOCAL_INPUT_PATH, LOCAL_OUTPUT_PATH, EC2_IP, USER_NAME, KEY_FILE_URL

def make_input_data():
    # 기준 날짜 설정 (오늘부터 5일 전까지의 데이터를 모을 것이므로)
    kst = pytz.timezone('Asia/Seoul')
    end_date = datetime.now(kst).date()
    start_date = end_date - timedelta(days=7)

    # 파일들을 저장할 리스트
    file_contents = []

    # 파일들을 읽어들이고 내용을 리스트에 추가
    for i in range((end_date - start_date).days + 1):
        current_date = start_date + timedelta(days=i)
        file_path = os.path.join(DAYS_NEWS_PATH, f"news_data_{current_date.strftime('%Y%m%d')}.json")
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as file:
                file_contents.append(file.read())
        else:
            print(f"Warning: File not found for date {current_date.strftime('%Y%m%d')}")

    # 폴더가 없는 경우 폴더를 생성
    os.makedirs(os.path.dirname(DOCKER_INPUT_PATH), exist_ok=True)
    # 모든 파일 내용을 한 파일에 저장
    with open(DOCKER_INPUT_PATH, "w", encoding="utf-8") as output_file:
        for content in file_contents:
            output_file.write(content)

def copy_to_hdfs():
    hdfs_path = "/input"
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(EC2_IP, username=USER_NAME, key_filename=KEY_FILE_URL)

    hadoop_command = f'''
        export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; 
        export HADOOP_HOME=/usr/local/hadoop; 
        export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; 
        hdfs dfs -put -f {LOCAL_INPUT_PATH} {hdfs_path}
    '''

    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()
    ssh.close()

    if exit_status == 0:
        print("Hadoop command executed successfully")
        return True
    else:
        print(f"Error executing Hadoop command: {stderr.read().decode()}")
        return False

def copy_from_hdfs():
    # 폴더가 없는 경우 폴더를 생성
    os.makedirs(os.path.dirname(DOCKER_OUTPUT_PATH), exist_ok=True)
    base_path = "/output"
    hdfs_path = os.path.join(base_path, TF_IDF_BASE_NAME, "part-00000")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(EC2_IP, username=USER_NAME, key_filename=KEY_FILE_URL)

    hadoop_command = f'''
        export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; 
        export HADOOP_HOME=/usr/local/hadoop; 
        export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; 
        hdfs dfs -copyToLocal -f {hdfs_path} {LOCAL_OUTPUT_PATH}
    '''

    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()
    ssh.close()

    if exit_status == 0:
        print("Hadoop command executed successfully")
        return True
    else:
        print(f"Error executing Hadoop command: {stderr.read().decode()}")
        return False


def start_hadoop_streaming():
    input_path = f"/input/{TF_IDF_BASE_NAME}"
    output_path = f"/output/{TF_IDF_BASE_NAME}"
    map_reduce_path = "/home/ubuntu/newsData"
    hadoop_command = f'''
        export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64; 
        export HADOOP_HOME=/usr/local/hadoop; 
        export PATH=$PATH:$HADOOP_HOME/bin:$HADOOP_HOME/sbin; 
        hadoop fs -rm -r {output_path};
        hadoop jar /usr/local/hadoop/share/hadoop/tools/lib/hadoop-streaming-*.jar \
        -files {map_reduce_path}/TFIDF_mapper.py,{map_reduce_path}/TFIDF_reducer.py \
        -mapper 'python3 {map_reduce_path}/TFIDF_mapper.py' \
        -reducer 'python3 {map_reduce_path}/TFIDF_reducer.py' \
        -input {input_path} \
        -output {output_path}
    '''

    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(EC2_IP, username=USER_NAME, key_filename=KEY_FILE_URL)
    
    stdin, stdout, stderr = ssh.exec_command(hadoop_command)
    exit_status = stdout.channel.recv_exit_status()
    ssh.close()

    if exit_status == 0:
        print("Hadoop Streaming job executed successfully")
        return True
    else:
        print(f"Error executing Hadoop Streaming job: {stderr.read().decode()}")
        return False