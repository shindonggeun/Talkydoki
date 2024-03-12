import React from "react";
import { NegativeTitle } from "@/styles/common/ui/text";
import TimerCarousel from "@/components/Main/TimerCarousel";

import Image1 from "@/assets/images/sampleimage/img1.jpg";
import Image2 from "@/assets/images/sampleimage/img2.jpg";
import Image3 from "@/assets/images/sampleimage/img3.jpg";

type Props = {};

const newsList = [
  {
    img: Image1,
    kortitle:
      "「쿠도회」 Top에게 무기징역, 1심 사형 판결은 취소, 후쿠오카 고등재판소",
    title: "「工藤会」トップに無期懲役 1審の死刑判決取り消し 福岡高裁",
  },
  {
    img: Image2,
    kortitle:
      "[추모의 목소리] 만화가 토리야마 아키라 사망, 68세, 「DRAGON BALL」 등",
    title: "【追悼の声】漫画家 鳥山明さん死去 68歳 「DRAGON BALL」など",
  },
  {
    img: Image3,
    kortitle:
      "유도 사이토 타츠루 파리 올림픽으로 「하루하루를 소중하게」 일본 대표 합숙",
    title: "柔道 斉藤立 パリ五輪へ「1日1日を大切に」 日本代表合宿",
  },
];

function TodaysNews({}: Props) {
  return (
    <>
      <NegativeTitle>오늘의 뉴스</NegativeTitle>
      <TimerCarousel width={100} height={40} news={newsList} />
    </>
  );
}

export default TodaysNews;
