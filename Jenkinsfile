pipeline {
    agent any

    stages {
        stage('Deploy with Docker Compose') {
            steps {
                script {
                    // 이전 실행에서 사용된 컨테이너 및 네트워크 정리
                    sh "docker-compose down --volumes"

                    // 새로운 푸시에 대한 스크립트 실행
                    sh "docker-compose up --build -d"

                    // WebStomp 플러그인 활성화
                    sh "docker exec talkydoki_rabbitmq rabbitmq-plugins enable rabbitmq_web_stomp"

                    // 스프링 부트 재실행
                    sh "docker restart talkydoki_backend_springboot"
                }
            }
        }
    }
}
