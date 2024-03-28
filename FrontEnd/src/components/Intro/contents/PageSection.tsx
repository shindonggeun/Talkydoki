import { PageSectionWrapper } from "@/styles/Intro/containers";
import { SectionTitle } from "@/styles/Intro/ui";
import { useEffect, useRef } from "react";
import News from "@/assets/images/samples/news2.png";
import MyPage from "@/assets/images/samples/mypage.png";

type Props = {};

function PageSection({}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const now = useRef(0);

  const scrollHandler = () => {
    const pageHeight = now.current * window.innerHeight * 1.5;
    const topHeight =
      window.innerHeight * 2 + pageHeight - window.innerHeight * 0.2;
    if (window.scrollY - topHeight >= 0) {
      now.current += 1;

      if (!scrollRef.current) return;
      const active = now.current - 1;
      scrollRef.current.children[active].classList.add("active");
    }
    if (now.current == 3) {
      window.removeEventListener("scroll", scrollHandler);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <>
      <SectionTitle>사이트 소개</SectionTitle>
      <PageSectionWrapper ref={scrollRef}>
        {/* p1 */}
        <div className="page" style={{ backgroundColor: "var(--main)" }}>
          <img src={News} alt="news" className="image" />
          <div className="desc">
            <h1>오늘의 뉴스</h1>
            <div>
              사용자의 취향을 분석하여 일본어 뉴스를 추천해 드립니다. 관심 있는
              분야의 뉴스를 듣고, 따라 읽고, 모르는 표현을 기록하며 말하기에
              익숙해져 보세요.
            </div>
          </div>
        </div>
        {/* p2 */}
        <div
          className="page reverse"
          style={{ backgroundColor: "var(--yellow-dark)" }}
        >
          <img src={News} alt="news" className="image" />
          <div className="desc">
            <h1>테마별 회화</h1>
            <div>
              식당, 편의점, 호텔, 비즈니스 등, AI와 함께 상황에 맞는 여러가지
              테마의 회화를 연습할 수 있어요.
            </div>
          </div>
        </div>
        {/* p3 */}
        <div className="page" style={{ backgroundColor: "var(--text)" }}>
          <img src={MyPage} alt="news" className="image" />
          <div className="desc">
            <h1>사용자 분석</h1>
            <div>
              학습을 진행하고 학습량을 측정하여 학습 진도를 확인하고, 다른
              유저들의 평균을 확인하여 앞으로의 학습 목표를 설정해 보세요.
            </div>
          </div>
        </div>
      </PageSectionWrapper>
    </>
  );
}

export default PageSection;
