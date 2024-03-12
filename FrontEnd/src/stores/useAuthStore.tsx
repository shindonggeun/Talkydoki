// import { AuthState } from "@/interface/AuthInterface";
// import { create } from "zustand";

// // AuthState 확장 로그인 로그아웃 기능 위한 매서드 추가
// interface AuthStore extends AuthState {
//   setLogin: (jwtToken: string, memberInfo: AuthState["memberInfo"]) => void;
//   setLogout: () => void;
// }

// // 로그인 로그아웃 전역관리
// export const useAuthStore = create<AuthStore>((set) => ({
//   isLoggedIn: false,
//   jwtToken: "",
//   memberInfo: {
//     id: 0,
//     email: "",
//     name: "",
//     nickname: "",
//     profileImage: null,
//     role: "",
//   },
//   setLogin: (jwtToken, memberInfo) =>
//     set({
//       isLoggedIn: true,
//       jwtToken,
//       memberInfo,
//     }),
//   setLogout: () =>
//     set({
//       isLoggedIn: false,
//       jwtToken: "",
//       memberInfo: {
//         id: 0,
//         email: "",
//         name: "",
//         nickname: "",
//         profileImage: null,
//         role: "",
//       },
//     }),
// }));
