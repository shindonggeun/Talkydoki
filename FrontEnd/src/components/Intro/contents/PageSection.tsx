import { PageSectionWrapper } from "@/styles/Intro/containers";
import { SectionTitle } from "@/styles/Intro/ui";
import News from "@/assets/images/samples/news2.png";
import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";

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
      console.log(scrollRef.current.children);
      scrollRef.current.children[active].classList.add("active");
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
              사용자의 취향을 분석하여 일본어 뉴스를 추천해 드립니다. 뉴스를
              듣고, 쉐도잉한 후 발음을 평가받아보세요
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
            <h1>오늘의 뉴스</h1>
            <div>
              사용자의 취향을 분석하여 일본어 뉴스를 추천해 드립니다. 뉴스를
              듣고, 쉐도잉한 후 발음을 평가받아보세요
            </div>
          </div>
        </div>
      </PageSectionWrapper>
    </>
  );
}

export default PageSection;
