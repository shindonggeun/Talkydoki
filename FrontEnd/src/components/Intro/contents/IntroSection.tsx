import { IntroSectionWrapper } from "@/styles/Intro/containers";
import { useEffect, useRef } from "react";

type Props = {};

function IntroSection({}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollChecker = () => {
    if (!scrollRef.current) return;
    if (window.scrollY > 0) {
      scrollRef.current.classList.add("active");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollChecker);
    return () => window.removeEventListener("scroll", scrollChecker);
  }, []);

  return (
    <IntroSectionWrapper>
      <div className="contentBox">
        <div className="section">
          <div className="quote">
            "아, <span className="strong">와사비 빼 달라고</span> 하고 싶은데…"
          </div>
          <div className="quote">
            "길 물어볼 때 <span className="strong">뭐라고 하지?"</span>
          </div>
          <div className="quote">
            "이거 <span className="strong">맞는 표현</span>인가?"
          </div>
        </div>
        <div className="section" ref={scrollRef}>
          <div className="intros">
            여행이나 비즈니스로 일본에 갔을 때, 이렇게 생각한 적 없으신가요?
            <br />
            분명 배운 것 같은데…
            <br />
            막상 말하려니 망설여진 적은 없으신가요?
            <br />
          </div>
          <div className="intros" style={{ textAlign: "center" }}>
            <strong>그럴 때, TalkyDoki가 힘이 되어 드릴게요</strong>
          </div>
          <div className="intros">
            TalkyDoki란 두근거림을 뜻하는 일본어 dokidoki (ドキドキ)와 대화를
            의미하는 영단어 Talk의 합성어로, 익숙하지 않은 일본어로 대화하는
            떨림을 두근거림으로 바꾸어주는 서비스입니다.
          </div>
          <div className="intros" style={{ textAlign: "center" }}>
            <strong>긴장을 자신감으로,</strong>
            <br />
            <strong>떨림을 설레임으로</strong>
          </div>
          <div
            className="quote"
            style={{ marginTop: "50px", textAlign: "center" }}
          >
            TalkyDoki
          </div>
        </div>
      </div>
    </IntroSectionWrapper>
  );
}

export default IntroSection;
