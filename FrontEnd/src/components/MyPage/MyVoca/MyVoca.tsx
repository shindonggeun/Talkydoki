import { Wrapper } from "@/styles/common/ui/container";
import { useMyVoca } from "@/api/vocaApi";

import { NegativeTitle } from "@/styles/common/ui/text";
import { VocaContainer } from "@/styles/User/MyVoca";

import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import MyVocaCard from "@/components/MyPage/MyVoca/MyVocaCard";
import InfiniteObserver from "@/components/ui/InfiniteObserver";

function MyVoca() {
  const { data, fetchNextPage, isFetching, isLoading } = useMyVoca();
  const [isMeaningOn, setIsMeaningOn] = useState(true);
  const [isReadOn, setIsReadOn] = useState(true);

  const scrollObserverCallback: IntersectionObserverCallback = ([
    { isIntersecting },
  ]) => {
    if (isIntersecting) {
      fetchNextPage();
    }
  };

  return (
    <Wrapper>
      <NegativeTitle>나의 단어장</NegativeTitle>
      <VocaContainer>
        {/* 뜻/단어 보기 toggle버튼 */}
        <div className="options">
          <FormControlLabel
            value={isMeaningOn}
            control={<Switch color="purple" defaultChecked />}
            label="뜻 보기"
            labelPlacement="start"
            onChange={() => setIsMeaningOn((prev) => !prev)}
          />
          <FormControlLabel
            value={isReadOn}
            control={<Switch color="purple" defaultChecked />}
            label="발음 보기"
            labelPlacement="start"
            onChange={() => setIsReadOn((prev) => !prev)}
          />
        </div>
        {/* 단어장 리스트 출력 */}
        {data &&
          data.map((each) => (
            <MyVocaCard
              key={each.personalVocabularyId}
              voca={each}
              isReadOn={isReadOn}
              isMeaningOn={isMeaningOn}
            />
          ))}
      </VocaContainer>
      <InfiniteObserver
        observerCallback={scrollObserverCallback}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </Wrapper>
  );
}

export default MyVoca;
