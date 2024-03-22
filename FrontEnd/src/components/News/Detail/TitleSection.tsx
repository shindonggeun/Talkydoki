import ThumbnailView from "@/components/ui/ThumbnailView";
import { WordContainer } from "@/styles/News/Detail/container";
import { Divider } from "@mui/material";
import React from "react";
import Word from "./ui/Word";
import { newsSplitter } from "@/util/language/format";

type Props = {
  title: string;
  url: string;
  date: string;
  images: string[];
};

function TitleSection({ title, url, date, images }: Props) {
  return (
    <>
      <WordContainer className="isTitle">
        {newsSplitter(title)[0].map((each, idx) => (
          <Word word={each} />
        ))}
      </WordContainer>
      <div className="info">작성일: {date.slice(0, 10)}</div>
      <div className="info">url: {url}</div>
      <Divider sx={{ margin: "2vh 0" }} />
      <ThumbnailView images={images} isThumb={false} />
    </>
  );
}

export default TitleSection;
