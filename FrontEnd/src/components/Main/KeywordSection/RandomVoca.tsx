import { useAddVoca, useDeleteMyVoca, useGetVoca } from "@/api/vocaApi";
import { AddVocaBtn, VocaCard } from "@/styles/Main/voca";
import { splitMeaning } from "@/util/language/voca";
import { useEffect, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import StarIcon from "@mui/icons-material/Star";
import { JptoKor } from "@/util/language/japanese";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function RandomVoca() {
  const [isAdded, setIsAdded] = useState(false);
  const [isActing, setIsActing] = useState(false);
  const [myVocaId, setMyVocaId] = useState<number | null>(null);
  const { data, isLoading } = useGetVoca();
  const queryClient = useQueryClient();
  const {
    mutate: addVoca,
    reset: resetAddvoca,
    isSuccess: isAddvocaSuccess,
  } = useAddVoca("getVoca", data ? data.japanese : "");
  const {
    mutate: deleteVoca,
    reset: resetDeleteVoca,
    isSuccess: isDeleteVocaSuccess,
  } = useDeleteMyVoca(data ? data.japanese : "");

  // 단어장에 단어 추가 성공 시 실행 함수
  useEffect(() => {
    if (isAddvocaSuccess) {
      const updatedData = queryClient.getQueryData([
        "getVoca",
      ]) as AxiosResponse;
      if (!updatedData) return;
      setMyVocaId(updatedData.data.dataBody.personalVocabularyId);
      setIsAdded(true);
      setIsActing(false);
      resetAddvoca();
    }
  }, [isAddvocaSuccess]);

  // 단어장 단어 삭제 성공 시 실행 함수
  useEffect(() => {
    if (isDeleteVocaSuccess) {
      setIsAdded(false);
      setIsActing(false);
      setMyVocaId(null);
      resetDeleteVoca();
    }
  }, [isDeleteVocaSuccess]);

  // 최초 렌더링 시 단어장 추가 여부 확인
  useEffect(() => {
    if (!data) return;
    setIsAdded(Boolean(data.personalVocabularyId));
    setMyVocaId(data.personalVocabularyId);
  }, []);

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

  // 단어 추가/삭제 함수
  const handleAddVoca = (id: number) => {
    if (isActing) return;
    if (!isAdded) {
      addVoca(id);
      setIsActing(true);
    } else {
      if (!myVocaId) return;
      deleteVoca(myVocaId);
      setIsActing(true);
    }
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
        <StarIcon className={`addIcon ${isAdded && "added"}`} />
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

export default RandomVoca;
