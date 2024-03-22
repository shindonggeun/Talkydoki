import { newsInterface } from "@/interface/NewsInterface";
import {
  ArticleContainer,
  WordContainer,
} from "@/styles/News/Detail/container";
import { newsSplitter, transSplitter } from "@/util/language/format";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useEffect, useState } from "react";
import Word from "./ui/Word";

type Props = {
  news: newsInterface;
};

function ArticleRead({ news }: Props) {
  const [options, setOptions] = useState<string[]>([]);
  const [isTransOn, setIsTransOn] = useState(false);
  const [isReadOn, setIssReadOn] = useState(false);
  const [isReadKrOn, setIsReadKrOn] = useState(false);

  const NewsContents = newsSplitter(news.content);
  const KorContents = transSplitter(news.contentTranslated);

  useEffect(() => {
    setOptions(() => {
      const arr = [];
      isTransOn && arr.push("trans");
      isReadOn && arr.push("read");
      isReadKrOn && arr.push("readkr");
      return arr;
    });
  }, [isTransOn, isReadKrOn, isReadOn]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ToggleButtonGroup value={options} color="purple" exclusive>
          <ToggleButton
            onClick={() => setIsTransOn((prev) => !prev)}
            value="trans"
          >
            번역 보기
          </ToggleButton>
          <ToggleButton
            onClick={() => setIssReadOn((prev) => !prev)}
            value="read"
          >
            발음 보기(일)
          </ToggleButton>
          <ToggleButton
            onClick={() => setIsReadKrOn((prev) => !prev)}
            value="readkr"
          >
            발음 보기(한)
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <ArticleContainer>
        {NewsContents.map((news, idx) => (
          <div key={idx}>
            <WordContainer>
              {news.map((line, idx) => (
                <Word
                  key={idx}
                  word={line}
                  isReadOn={isReadOn}
                  isReadKrOn={isReadKrOn}
                />
              ))}
            </WordContainer>
            <div>{KorContents[idx]}</div>
          </div>
        ))}
      </ArticleContainer>
    </div>
  );
}

export default ArticleRead;
