// 유저 프로필 인터페이스
export interface UserInterface {
  email: string;
  id: number;
  name: string;
  nickname: string;
  profileImage: string | null;
  role: string;
}
