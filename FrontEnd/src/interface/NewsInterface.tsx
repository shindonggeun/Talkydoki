export interface NewsListItemInterface {
  newsId: number;
  title: string;
  titleTranslated: string;
  category: string;
  writeDate: string;
  srcOrigin: string;
  newsImages: string[];
}

export interface categoryInterface {
  id: number;
  name: string;
  korName: string;
}

export const category: categoryInterface[] = [
  { id: 1, name: "SOCIETY", korName: "사회" },
  { id: 2, name: "WEATHER_DISASTER", korName: "날씨/재해" },
  { id: 3, name: "SCIENCE_CULTURE", korName: "과학/문화" },
  { id: 4, name: "POLITICS", korName: "정치" },
  { id: 5, name: "BUSINESS", korName: "비즈니스" },
  { id: 6, name: "INTERNATIONAL", korName: "국제" },
  { id: 7, name: "SPORTS", korName: "스포츠" },
  { id: 8, name: "LIFE", korName: "생활" },
];
