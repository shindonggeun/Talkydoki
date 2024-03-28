import Bronze from "@/assets/images/tierlogo/logo_11.png";
import Silver from "@/assets/images/tierlogo/logo_21.png";
import Gold from "@/assets/images/tierlogo/logo_31.png";
import Platinum from "@/assets/images/tierlogo/logo_41.png";

// 유저 프로필 인터페이스
export interface UserInterface {
  email: string;
  id: number;
  name: string;
  nickname: string;
  profileImage: string | null;
  role: string;
}

// 유저 키워드 인터페이스
export interface UserKeywordInterface {
  keyword: string;
  readCount: number;
}

export interface UserAchievementInterface {
  totalShaded: number;
  totalTalked: number;
  averageScore: {
    date: string;
    averageScore: number;
  }[];
  userScore: {
    date: string;
    score: number;
  }[];
}

interface userRankInterface {
  icon: string;
  rank: string;
}

export interface RecordInterface {
  date: string;
  userScore: number;
  averageScore: number;
}

export const userRank: userRankInterface[] = [
  {
    icon: Bronze,
    rank: "BRONZE",
  },
  {
    icon: Silver,
    rank: "SILVER",
  },
  {
    icon: Gold,
    rank: "GOLD",
  },
  {
    icon: Platinum,
    rank: "PLATINUM",
  },
];
