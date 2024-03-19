// http-commons.ts
import axios from "axios";
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
        originalRequest._retry = true;  // 요청 재시도한적 있다고 표시
        console.log("리프레쉬 토큰 재발급 실행 되는지 확인하기");
        originalRequest._retry = true;
        // return reissueTokenAndRetryRequest(originalRequest);
      }
      // 다른 모든 오류는 그대로 반환
      return error.response;
    }
  );

  return instance;
};

// 토큰 재발급 로직을 별도의 함수로 분리
// async function reissueTokenAndRetryRequest(originalRequest) {
//   try {
//     const memberEmail = localStorage.getItem("memberEmail");
//     console.log(memberEmail);
//     // memberEmail을 이용해 토큰 재발급 API 호출
//     const data = await axios.post(VITE_REACT_API_URL + `/member/reissue/accessToken/`, { memberEmail });
//     if (data.dataHeader.resultCode === 0) {
//       console.log("리프레쉬 토큰을 이용해서 accessToken 재발급 성공!");
//     } else {
//       console.log("실패!!!");
//       return;
//     }

//     const cookies = new Cookies();
//     const accessToken = cookies.get("accessToken");

//     // 원본 요청에 새 토큰 설정 후 재시도
//     originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//     return createAxiosInstance(originalRequest);
//   } catch (error) {
//     // 토큰 재발급 실패 처리
//     console.error('Token reissue failed:', error);
//     throw error;
//   }
// }

// 설정된 API URL을 사용하는 Axios 인스턴스
const customAxios = createAxiosInstance(VITE_REACT_API_URL);

export { customAxios };
