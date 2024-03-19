import { useAddVoca, useGetVoca } from "@/api/vocaApi";
import { AddVocaBtn, VocaCard } from "@/styles/Main/voca";
import { splitMeaning } from "@/util/language/voca";
import { useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { JptoKor } from "@/util/language/japanese";

function TodaysVoca() {
  const [isAdded, setIsAdded] = useState(false);
  const { data, isLoading } = useGetVoca();
  const { mutate: addVoca } = useAddVoca();

  if (!data) return <VocaCard></VocaCard>;
  if (isLoading)
    return (
      <VocaCard>
        <CircularProgress />
      </VocaCard>
    );

  const { id, japanese, japaneseRead, type } = data;
  const korean = splitMeaning(data.korean);
  const korRead = JptoKor(japaneseRead);

  const handleAddVoca = (id: number) => {
    addVoca(id);
    setIsAdded(true);
  };

  return (
    <VocaCard>
      {/* 단어장 아이콘 */}

      <AddVocaBtn
        className={`${isAdded ? "added" : null}`}
        onClick={() => {
          handleAddVoca(id);
        }}
      >
        {isAdded ? (
          <CheckIcon className={`icon ${isAdded ? "added" : null}`} />
        ) : (
          <AddIcon className={`icon ${isAdded ? "added" : null}`} />
        )}
      </AddVocaBtn>

      {/* 오늘의 단어 컨텐츠 */}
      <div className="inner">
        {/* 단어 (일어, 읽는 방법, 품사) */}
        <div className="wordSection">
          <div className="wordJp">{japanese}</div>
          <div className="typeNread">{type}</div>
          <div className={`typeNread`}>{japaneseRead}</div>
          <div className={`typeNread`}>{korRead}</div>
        </div>
        {/* 뜻 */}
        <div className="meaningSection">
          <div className="meaning">
            {korean.map((each, idx) => (
              <div key={idx}>{each}</div>
            ))}
          </div>
        </div>
      </div>
    </VocaCard>
  );
}

export default TodaysVoca;
