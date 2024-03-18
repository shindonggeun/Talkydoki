import { Wrapper } from "@/styles/common/ui/container";
import { useDeleteMyVoca, useMyVoca } from "@/api/vocaApi";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";

import { NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { VocaCard, VocaContainer } from "@/styles/User/MyVoca";

import { FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";
import { JptoKor } from "@/util/language/japanese";
import { splitMeaning } from "@/util/language/voca";

type Props = {};

function MyVoca({}: Props) {
  const { data, fetchNextPage, isLoading } = useMyVoca();
  const { mutate: deleteVoca } = useDeleteMyVoca();
  const queryClient = useQueryClient();
  const [isMeaningOn, setIsMeaningOn] = useState(true);
  const [isReadOn, setIsReadOn] = useState(true);

  return (
    <Wrapper>
      <NegativeTiTle>나의 단어장</NegativeTiTle>
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
        <button onClick={() => fetchNextPage()}>추가</button>
        <button
          onClick={() =>
            queryClient.invalidateQueries([
              "getVocaList",
            ] as InvalidateQueryFilters)
          }
        >
          지우기
        </button>
      </div>
      <VocaContainer>
        {data &&
          data.map((each) => (
            <VocaCard key={each.personalVocabularyId}>
              <button
                className="deleteButton"
                onClick={() => deleteVoca(each.personalVocabularyId)}
              >
                삭제
              </button>
              <div className="jpNtype">
                <div className="japanese">{each.japanese} </div>
                <div className="type">{each.type}</div>
              </div>
              <div className="readNmean">
                <div className={`read ${isReadOn ? undefined : "hide"}`}>
                  <div>{each.japaneseRead} | </div>
                  <div>{JptoKor(each.japaneseRead)}</div>
                </div>
                {splitMeaning(each.korean).map((mean, idx) => (
                  <div
                    className={`meaning ${isMeaningOn ? undefined : "hide"}`}
                    key={idx}
                  >
                    {mean}
                  </div>
                ))}
              </div>
            </VocaCard>
          ))}
      </VocaContainer>
    </Wrapper>
  );
}

export default MyVoca;
