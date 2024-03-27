import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroCards from "@/components/Intro/IntroCards";

import { IntroWrapper } from "@/styles/Intro/sections";
import { NoScroll } from "@/styles/common/base";
import LogoText from "@/assets/images/logo_text_light.png";
import Logo from "@/assets/images/logo_face2.png";
import { Button } from "@mui/material";

import News from "@/assets/images/samples/news1.png";
import { useDisplayAction } from "@/stores/displayStore";

const introItems: { title: string; description: string; img: string }[] = [
  {
    title: "TalkyDoki",
    description: "말하면서 배우는 일본어 회화 학습 서비스",
    img: "",
  },
  {
    title: "오늘의 뉴스",
    description: "나에게 꼭 맞는 뉴스를 추천받고 따라 읽어요",
    img: News,
  },
  {
    title: "오늘의 회화",
    description: "AI와 테마별 일본어 회화를 나누어요",
    img: "",
  },
  {
    title: "나의 학습 리포트",
    description: "나의 레벨을 확인하고, 앞으로의 학습 목표를 세워요",
    img: "",
  },
];

function Intro() {
  const [now, setNow] = useState(0);
  const stY = useRef(0);
  const navigate = useNavigate();
  const headerRef = useRef<HTMLDivElement>(null);
  const setIsDark = useDisplayAction();

  const wheelHandler = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setNow((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (e.deltaY >= 0) {
      setNow((prev) =>
        prev + 1 < introItems.length ? prev + 1 : introItems.length - 1
      );
    }
  };

  const touchHandler = (e: TouchEvent) => {
    if (!headerRef.current) return;
    const target = e.target as HTMLElement;
    if (headerRef.current.contains(target)) return;

    e.preventDefault();
    stY.current = e.changedTouches[0].pageY;
  };

  const touchEnd = (e: TouchEvent) => {
    if (!headerRef.current) return;
    const target = e.target as HTMLElement;
    if (headerRef.current.contains(target)) return;

    e.preventDefault();
    const edY = e.changedTouches[0].pageY;
    if (stY.current - edY < 0) {
      setNow((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (stY.current - edY >= 0) {
      setNow((prev) =>
        prev + 1 < introItems.length ? prev + 1 : introItems.length - 1
      );
    }
  };

  useEffect(() => {
    window.scrollTo({ top: window.innerHeight * now, behavior: "smooth" });
  }, [now]);

  useEffect(() => {
    window.addEventListener("wheel", wheelHandler, { passive: false });
    window.addEventListener("touchstart", touchHandler, { passive: false });
    window.addEventListener("touchend", touchEnd, { passive: false });
    setIsDark(false);

    return () => {
      window.removeEventListener("wheel", wheelHandler);
      window.removeEventListener("touchstart", touchHandler);
      window.removeEventListener("touchend", touchEnd);
    };
  }, []);

  return (
    <IntroWrapper>
      <NoScroll />
      <div className="desc" ref={headerRef}>
        <div className="logo button">
          <img src={LogoText} alt="talkydoki" />
          <img src={Logo} alt="talkydoki" />
        </div>
        <div className="buttons button">
          <Button
            variant="contained"
            color="purple"
            fullWidth
            className="button"
            onClick={() => navigate("/login")}
          >
            로그인
          </Button>
          <Button
            variant="outlined"
            color="purple"
            fullWidth
            className="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </Button>
        </div>
      </div>
      <div className="compos">
        {introItems.map((each, idx) => (
          <IntroCards
            key={idx}
            title={each.title}
            description={each.description}
            img={each.img}
          />
        ))}
      </div>
    </IntroWrapper>
  );
}

export default Intro;
