import { useDeleteMyVoca, useMyVoca } from "@/api/vocaApi";
import { Wrapper } from "@/styles/common/ui/container";
import { InvalidateQueryFilters, useQueryClient } from "@tanstack/react-query";
// import React from "react";

type Props = {};

function MyVoca({}: Props) {
  const { data, fetchNextPage } = useMyVoca();
  const { mutate: deleteVoca } = useDeleteMyVoca();
  const queryClient = useQueryClient();

  return (
    <Wrapper>
      MyVoca
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
      {data &&
        data.map((each) => (
          <div key={each.personalVocabularyId}>
            {each.japanese}{" "}
            <button onClick={() => deleteVoca(each.personalVocabularyId)}>
              삭제
            </button>
          </div>
        ))}
    </Wrapper>
  );
}

export default MyVoca;
