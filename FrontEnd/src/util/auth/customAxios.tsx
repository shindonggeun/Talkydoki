// http-commons.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";

const { VITE_REACT_API_URL } = import.meta.env;

// Axios 인스턴스 생성 함수
const createAxiosInstance = (baseURL?: string) => {
  const cookies = new Cookies();

  const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL || "",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  // 요청 인터셉터 설정
  instance.interceptors.request.use(
    (config) => {
      const accessToken = cookies.get("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 설정: 토큰 만료 시 재발급 처리
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // 토큰 만료된 경우이면서 요청 재시도한적이 없는 경우
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 요청 재시도한적 있다고 표시
        originalRequest._retry = true;
        return reissueTokenAndRetryRequest(originalRequest, instance);
      }

      // 다른 모든 오류는 그대로 반환
      return error.response;
    }
  );

  return instance;
};

// 토큰 재발급 로직을 별도의 함수로 분리
async function reissueTokenAndRetryRequest(
  originalRequest: InternalAxiosRequestConfig,
  instance: AxiosInstance
) {
  try {
    const session = sessionStorage.getItem("email");

    if (!session) return;
    const cookies = new Cookies();
    const memberEmail = JSON.parse(session).state.email;

    // memberEmail을 이용해 토큰 재발급 API 호출
    const res = await axios.post(
      `${VITE_REACT_API_URL}/member/reissue/accessToken/${memberEmail}`
    );
    if (res.data.dataHeader.successCode === 0) {
      cookies.set("accessToken", res.data.dataBody);
    } else {
      return;
    }

    const accessToken = cookies.get("accessToken");

    // 원본 요청에 새 토큰 설정 후 재시도
    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

    return instance.request(originalRequest);
  } catch (error) {
    // 토큰 재발급 실패 처리
    console.error("Token reissue failed:", error);
    throw error;
  }
}

// 설정된 API URL을 사용하는 Axios 인스턴스
const customAxios = createAxiosInstance(VITE_REACT_API_URL);

export { customAxios };
