import { useSearchWordApi } from "@/api/newsApi";
import { useAddVoca } from "@/api/vocaApi";
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

function WordSearch() {
  const isSearchOn = useIsSearchOn();
  const setIsSearchOn = useSetIsSearchOn();
  const searchWord = useSearchWord();
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [xy, setXy] = useState({ x: 0, y: 0 });

  const [word, setWord] = useState<WordSearchInterface>({
    japanese: "",
    japaneseRead: "",
  });

  // 스크롤 시 검색창 꺼짐
  const moveHandler = () => {
    if (isSearchOn) {
      setIsSearchOn(false);
    }
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
    if (!isSearchOn) return;
    window.addEventListener("scroll", moveHandler);
    window.addEventListener("mousedown", clickHandler);

    return () => {
      window.removeEventListener("scroll", moveHandler);
      window.removeEventListener("mousedown", clickHandler);
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
  }, [data, searchWord]);

  if (!isSearchOn) return <></>;
  return (
    <WordSearchWrapper
      ref={searchRef}
      className="searchBox"
      style={{ top: `${xy.y}px`, left: `${xy.x}px` }}
    >
      {isFetching && <CircularProgress color="purple" />}
      {data && (
        <div className="searchBox">
          <div className="header searchBox">
            <div className="jp searchBox">{word.japanese}</div>
            {word.id && (
              <StarIcon
                className="searchBox addIcon"
                onClick={() => {
                  if (word.id != undefined) {
                    return addVoca(word.id);
                  }
                }}
                fontSize="large"
              />
            )}
          </div>
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
