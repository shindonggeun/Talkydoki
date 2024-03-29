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
    const pageHeight = now.current * window.innerHeight * 2;
    const topHeight =
      window.innerHeight * 2.5 + pageHeight - window.innerHeight * 0.5;
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
      <PageSectionWrapper ref={scrollRef}>
        {/* p1 */}
        <div className="page" style={{ backgroundColor: "var(--main)" }}>
          <SectionTitle>뉴스 쉐도잉</SectionTitle>
          <img src={News} alt="news" className="image" />
          <div className="desc">
            <h1>오늘의 뉴스</h1>
            <div>
              사용자의 취향을 분석하여 일본어 뉴스를 추천해 드립니다. 나의 관심
              키워드를 분석 받고, 나에게 딱 맞는 뉴스를 추천 받아 보세요.
            </div>
            <h1>뉴스: 읽기모드</h1>
            <div>
              매일 업데이트되는 NHK의 뉴스를 경험해 보세요. TTS가 읽어주는 뉴스
              컨텐츠를 듣고, 화면에 나타나는 일어 발음을 따라 읽으며 모르는
              단어를 체크해 보세요.
            </div>
            <h1>뉴스: 학습모드</h1>
            <div>
              화면에 한 문장씩 표시되는 뉴스를 듣고, 따라 읽은 뒤 정확도를 평가
              받아 보세요. 나의 목소리와 원어 발음을 비교하며 말하기 스킬을 익힐
              수 있어요.
            </div>
          </div>
        </div>
        {/* p2 */}
        <div
          className="page reverse"
          style={{ backgroundColor: "var(--yellow-dark)" }}
        >
          <SectionTitle style={{ left: "inherit", right: "10px" }}>
            회화 연습
          </SectionTitle>
          <img src={News} alt="news" className="image" />
          <div className="desc">
            <h1>테마별 회화</h1>
            <div>
              식당, 편의점, 호텔, 비즈니스 등, AI와 함께 상황에 맞는 여러가지
              테마의 회화를 연습할 수 있어요.
            </div>
            <h1>AI 튜터</h1>
            <div>
              "이런 상황엔 뭐라고 말해야 하지?"
              <br />
              사용자가 자연스러운 대답을 할 수 있도록, AI 튜터가 상황에 맞는
              대답을 알려 드립니다.
            </div>
            <h1>회화 리포트</h1>
            <div>
              AI와 나눈 대화를 바탕으로 유저의 회화 리포트를 작성해 드려요. 회화
              요약본을 체크하며 매일 늘어가는 나의 실력을 확인해 보세요.
            </div>
          </div>
        </div>
        {/* p3 */}
        <div className="page" style={{ backgroundColor: "var(--red-dark)" }}>
          <SectionTitle>사용자 분석 </SectionTitle>
          <img src={MyPage} alt="news" className="image" />
          <div className="desc">
            <h1>나의 학습 진도</h1>
            <div>
              학습을 진행하고, 매일 잔디를 심으며 나의 학습 진도를 확인해
              보세요.
            </div>
            <h1>유저 평균</h1>
            <div>
              다른 유저들의 평균 점수를 확인하고, 같은 날 나의 점수를 확인하여
              나의 실력을 점검해 보세요.
            </div>
            <h1>나의 단어장</h1>
            <div>
              모르는 단어를 단어장에 저장하고, 단어장을 꺼내 보며 어휘량을 늘려
              보세요.
            </div>
          </div>
        </div>
      </PageSectionWrapper>
    </>
  );
}

export default PageSection;
