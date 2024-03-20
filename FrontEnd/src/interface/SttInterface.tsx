// 환경 변수를 불러오고 내보내는 설정 파일

interface EnvConfig {
  awsAccessKeyId: string;
  awsSecretAccessKey: string;
  awsRegion: string;
}

const env: EnvConfig = {
  awsAccessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: import.meta.env
    .VITE_AWS_ACCESS_KEY_ID_APP_AWS_SECRET_ACCESS_KEY,
  awsRegion: "us-east-1",
};

export default env;
