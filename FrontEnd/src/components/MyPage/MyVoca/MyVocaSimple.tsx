import { useMyVoca } from "@/api/vocaApi";
import { useState } from "react";
import StartCover from "./StartCover";
import { VocaCard } from "@/styles/User/Mypage";

type Props = {};

function MyVocaSimple({}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCover, setIsCover] = useState(true);
  //hasNextPage 다음페이지 불러올수 있는지 확인하는값

  const {
    data: words,
    isSuccess,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useMyVoca();
  const isNextDisabled =
    !isCover && (!hasNextPage || (words && currentIndex + 1 >= words.length));
  console.log("words", words);
  const handleNext = () => {
    if (isCover) {
      setIsCover(false);
    } else {
      const nextPageIndex = currentIndex + 1;

      if (words && nextPageIndex < words.length) {
        setCurrentIndex(nextPageIndex);
      } else if (hasNextPage) {
        fetchNextPage().then(() => {
          setCurrentIndex(nextPageIndex);
        });
      }
    }
  };

  const handlePrevious = () => {
    // 첫 번째 단어에서 "이전" 버튼을 누르면 시작 표지로 돌아갑니다.
    if (currentIndex === 0 && !isCover) {
      setIsCover(true);
    } else if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="VocaReportContainer">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading the word</p>}
      {isCover ? (
        <StartCover handleNext={handleNext} isNextDisabled={isNextDisabled} />
      ) : (
        isSuccess && (
          <>
            <VocaCard>
              <div>
                {words[currentIndex]?.japanese} - {words[currentIndex]?.korean}
              </div>
              <button
                onClick={handlePrevious}
                disabled={isCover && currentIndex === 0}
              >
                이전
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNextPage && currentIndex + 1 >= words.length}
              >
                다음
              </button>
            </VocaCard>
          </>
        )
      )}
    </div>
  );
}

export default MyVocaSimple;
