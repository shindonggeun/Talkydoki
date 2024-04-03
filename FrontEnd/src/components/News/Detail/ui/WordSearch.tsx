import { useSearchWordApi } from "@/api/newsApi";
import { useAddVoca, useDeleteMyVoca } from "@/api/vocaApi";
import { WordSearchInterface } from "@/interface/VocaInterface";
import { useIsMobile } from "@/stores/displayStore";
import {
  useIsSearchOn,
  useSearchWord,
  useSetIsSearchOn,
} from "@/stores/newsStore";
import { WordSearchWrapper } from "@/styles/News/Detail/container";
import { splitMeaning } from "@/util/language/voca";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

function WordSearch() {
  const isSearchOn = useIsSearchOn();
  const setIsSearchOn = useSetIsSearchOn();
  const searchWord = useSearchWord();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const searchRef = useRef<HTMLDivElement>(null);
  const [isAdd, setIsAdd] = useState(false);
  const [myVocaId, setMyVocaId] = useState<null | number>(null);
  const [xy, setXy] = useState({ x: 0, y: 0 });
  const [isActing, setIsActing] = useState(false);
  const [word, setWord] = useState<WordSearchInterface>({
    japanese: "",
    japaneseRead: "",
  });

  // 스크롤 시 검색창 꺼짐
  const moveHandler = (e: WheelEvent) => {
    if (isSearchOn && e.deltaY != 0) {
      setIsSearchOn(false);
    }
  };

  // 다른곳 클릭 시 검색창 꺼짐
  const clickHandler = (e: MouseEvent) => {
    if (!searchRef.current) return;
    if (!isSearchOn) return;
    const target = e.target as HTMLElement;
    if (!searchRef.current.contains(target)) {
      setIsSearchOn(false);
    }
  };

  // 스크롤하거나 다른 곳 클릭할 시 꺼짐
  useEffect(() => {
    if (!isSearchOn) return;
    window.addEventListener("wheel", moveHandler);
    window.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("wheel", moveHandler);
      window.removeEventListener("mousedown", clickHandler);
      setIsAdd(false);
    };
  }, [isSearchOn]);

  // 화면 삐져나가지 않는 설정
  useEffect(() => {
    if (!searchRef.current) return;
    const sx = searchWord.x;
    const sy = searchWord.y;
    let nx = 0;
    let ny = 0;

    if (isMobile) {
      setXy({ x: 5, y: window.innerHeight * 0.5 - 100 });
      return;
    }
    if (sx + searchRef.current.offsetWidth > window.innerWidth) {
      nx = sx - searchRef.current.offsetWidth;
    } else {
      nx = sx;
    }
    if (sy + searchRef.current.offsetHeight > window.innerHeight - 100) {
      ny = sy - searchRef.current.offsetHeight;
    } else {
      ny = sy;
    }
    setXy({ x: nx, y: ny });
  }, [searchWord]);

  const { data, isFetching, isError } = useSearchWordApi(searchWord.word);
  const {
    mutate: addVoca,
    isSuccess: isAddVocaSuccess,
    reset: resetAddVoca,
  } = useAddVoca("searchWord", searchWord.word);
  const {
    mutate: deleteVoca,
    isSuccess: isDeleteVocaSuccess,
    reset: resetDeleteVoca,
  } = useDeleteMyVoca(searchWord.word);

  // 단어장에 단어 추가 함수
  useEffect(() => {
    if (isAddVocaSuccess) {
      const updatedData = queryClient.getQueryData([
        "searchWord",
        word.japanese,
      ]) as AxiosResponse;
      if (!updatedData) return;
      setMyVocaId(updatedData.data.dataBody.personalVocabularyId);
      setIsAdd(true);
      resetAddVoca();
      setIsActing(false);
    }
  }, [isAddVocaSuccess]);

  // 단어장 단어 삭제 함수
  useEffect(() => {
    if (isDeleteVocaSuccess) {
      setIsAdd(false);
      setMyVocaId(null);
      resetDeleteVoca();
      setIsActing(false);
    }
  }, [isDeleteVocaSuccess]);

  // 검색
  useEffect(() => {
    if (!data) return;
    if (data == "nodata" || isError) {
      setWord({ japanese: searchWord.word, japaneseRead: searchWord.read });
    } else {
      setWord({ ...data });
      setIsAdd(Boolean(data.personalVocabularyId));
      if (data.personalVocabularyId) setMyVocaId(data.personalVocabularyId);
    }
  }, [data, searchWord]);

  // 단어장 단어 추가/삭제
  const addVocaHandler = (id: number) => {
    if (isActing) return;
    if (word.id === undefined) return;
    if (!isAdd) {
      addVoca(id);
      setIsActing(true);
    } else {
      if (!myVocaId) return;
      deleteVoca(myVocaId);
      setIsActing(true);
    }
  };

  if (!isSearchOn) return <></>;
  return (
    <WordSearchWrapper
      ref={searchRef}
      style={{ top: `${xy.y}px`, left: `${xy.x}px` }}
    >
      {isFetching && (
        <div className="flex">
          <CircularProgress color="purple" />
        </div>
      )}
      {data && (
        <div>
          <div className="header ">
            <div className="jp ">{word.japanese}</div>
            {word.id && (
              <StarIcon
                className={`addIcon ${isAdd && "added"}`}
                onClick={() => {
                  setIsAdd(true);
                  if (word.id != undefined) {
                    return addVocaHandler(word.id);
                  }
                }}
                fontSize="large"
              />
            )}
          </div>
          <div>{word.japaneseRead}</div>
          {word.korean &&
            splitMeaning(word.korean).map((each, idx) => (
              <div key={idx}>{each}</div>
            ))}
        </div>
      )}
    </WordSearchWrapper>
  );
}

export default WordSearch;
