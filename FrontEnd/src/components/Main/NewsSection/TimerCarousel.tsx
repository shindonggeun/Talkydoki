import { newsInterface } from "@/interface/NewsInterface";
import { TimerCarouselWrapper, MainCarouselItem } from "@/styles/Main/carousel";
import { newsSplitter, sentenceMaker } from "@/util/language/format";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultImage from "@/assets/images/default_news_image.jpeg";

type Props = {
  width: number; // 캐러셀 넓이, %단위 (Wrapper 기준)
  height: number; // 캐러셀 높이, %단위 (Warpper 기준)
  news: newsInterface[]; // 뉴스 배열(임시)
};

function TimerCarousel({ width, height, news }: Props) {
  const [now, setNow] = useState(0);
  const [timer, setTimer] = useState(0);
  const [nextTime, setNextTime] = useState(1);
  const navigate = useNavigate();

  // 5초마다 한 번씩 캐러셀 넘어감
  useEffect(() => {
    setTimeout(() => {
      setTimer((prev) => {
        if (prev < 100) {
          setNextTime(1);
          return prev + 0.025;
        } else {
          setNextTime(1000);
          setNow((prev) => (prev + 1 < news.length ? prev + 1 : 0));
          return 0;
        }
      });
    }, nextTime);
  }, [timer]);

  return (
    <TimerCarouselWrapper
      $width={width}
      $height={height}
      $newsCount={news.length}
    >
      {/* 타이머 Wrapper */}
      <div className="timerWrapper">
        {/* 타이머 */}
        <div
          className="timer"
          onClick={() => {
            setNow(0), setTimer(0);
          }}
        >
          {/* 타이머 배경 Bar */}
          <div
            className="timerBar"
            style={{ width: now == 0 ? `${timer}%` : "100%" }}
          ></div>
        </div>
        <div
          className="timer"
          onClick={() => {
            setNow(1), setTimer(0);
          }}
        >
          <div
            className="timerBar"
            style={{ width: now == 1 ? `${timer}%` : now == 2 ? "100%" : "0%" }}
          ></div>
        </div>
        <div
          className="timer"
          onClick={() => {
            setNow(2), setTimer(0);
          }}
        >
          <div
            className="timerBar"
            style={{ width: now == 2 ? `${timer}%` : "0%" }}
          ></div>
        </div>
      </div>

      {/* 캐러셀 내용물 컨테이너 */}
      <div className="track" style={{ left: `${now * -100}%` }}>
        {news.map((each, idx) => {
          const newsImage =
            each.newsImages != null ? each.newsImages[0] : DefaultImage;
          return (
            <MainCarouselItem
              key={idx}
              $width={width}
              $height={height}
              $bgImg={newsImage}
              onClick={() => {
                navigate(`/news/detail`, { state: { newsId: each.id } });
              }}
            >
              <div className="titleBox">
                <div className="koTitle">{each.titleTranslated}</div>
                <div className="jpTitle">
                  {" "}
                  {sentenceMaker(newsSplitter(each.title)[0])}
                </div>
              </div>
            </MainCarouselItem>
          );
        })}
      </div>
    </TimerCarouselWrapper>
  );
}

export default TimerCarousel;
