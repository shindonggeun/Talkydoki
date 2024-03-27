import { VocaCard } from "@/styles/User/Mypage";

// Props 타입을 정의합니다. TypeScript를 사용하는 경우 이 부분을 interface로 정의할 수 있습니다.
type StartCoverProps = {
  handleNext: () => void;
  isNextDisabled: boolean;
};

// 시작 표지 컴포넌트
const StartCover = ({ handleNext, isNextDisabled }: StartCoverProps) => {
  return (
    <VocaCard
      style={{
        background: `linear-gradient(
      90deg, 
      rgba(205, 198, 251, 0.8) 1%, 
      #957df8 55.42%, 
      #6744f3 100%
    )`,
      }}
    >
      <div className="StartCover">
        <h2>
          나의 단어장{" "}
          <button onClick={handleNext} disabled={isNextDisabled}>
            다음
          </button>
        </h2>
      </div>
    </VocaCard>
  );
};

export default StartCover;
