import { useSearchWordApi } from "@/api/newsApi";
import { useAddVoca } from "@/api/vocaApi";
import { VocaInterface } from "@/interface/VocaInterface";
import {
  useIsSearchOn,
  useSearchWord,
  useSetIsSearchOn,
} from "@/stores/newsStore";
import { WordSearchWrapper } from "@/styles/News/Detail/container";
import { splitMeaning } from "@/util/language/voca";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useRef, useState } from "react";

type Props = {};

function WordSearch({}: Props) {
  const isSearchOn = useIsSearchOn();
  const setIsSearchOn = useSetIsSearchOn();
  const searchWord = useSearchWord();
  const searchRef = useRef<HTMLDivElement>(null);
  const [word, setWord]: {
    id?: number;
    japanese: string;
    japaneseRead: string;
    korean?: string;
    type?: string;
  } = useState({
    japanese: "",
    japaneseRead: "",
  });

  // 스크롤 시 검색창 꺼짐
  const moveHandler = () => {
    setIsSearchOn(false);
  };

  // 다른곳 클릭 시 검색창 꺼짐
  const clickHandler = (e: MouseEvent) => {
    if (!searchRef.current) return;
    if (!isSearchOn) return;
    const target = e.target as HTMLElement;
    if (!target.classList.contains("searchBox")) {
      setIsSearchOn(false);
    }
  };

  // 스크롤하거나 다른 곳 클릭할 시 꺼짐
  useEffect(() => {
    window.addEventListener("scroll", moveHandler);
    setTimeout(() => {
      window.addEventListener("click", clickHandler);
    }, 1);
    return () => {
      window.removeEventListener("scroll", moveHandler);
      window.removeEventListener("click", clickHandler);
    };
  }, [isSearchOn]);

  const { data, isFetching } = useSearchWordApi(searchWord.word);
  const { mutate: addVoca } = useAddVoca();

  // 검색
  useEffect(() => {
    if (!data) return;
    if (data == "nodata") {
      console.log("데이터없음");
      setWord({ japanese: searchWord.word, japaneseRead: searchWord.read });
    } else {
      console.log(data);
      setWord({ ...data });
    }
  }, [data]);

  if (!isSearchOn) return <></>;
  return (
    <WordSearchWrapper
      ref={searchRef}
      className="searchBox"
      style={{ top: `${searchWord.y}px`, left: `${searchWord.x}px` }}
    >
      {isFetching && <CircularProgress color="purple" />}
      {data && (
        <div className="searchBox">
          <div className="jp searchBox">{word.japanese}</div>
          {word.id && (
            <button className="searchBox" onClick={() => addVoca(word.id)}>
              추가
            </button>
          )}
          <div className="searchBox">{word.japaneseRead}</div>
          {word.korean &&
            splitMeaning(word.korean).map((each, idx) => (
              <div className="searchBox" key={idx}>
                {each}
              </div>
            ))}
        </div>
      )}
    </WordSearchWrapper>
  );
}

export default WordSearch;
