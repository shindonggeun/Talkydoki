import { WordItem } from "@/styles/News/Detail/ui";
import { JptoKor, KanaToHira } from "@/util/language/japanese";
import React from "react";

type Props = {
  word: string[];
  isReadOn?: boolean;
  isReadKrOn?: boolean;
};

function Word({ word, isReadOn, isReadKrOn }: Props) {
  return (
    <WordItem>
      <div className={`read ${isReadOn && "show"}`}>{KanaToHira(word[1])}</div>
      <div className="japanese">{word[0]}</div>
      <div className={`readKor ${isReadKrOn && "show"}`}>
        {JptoKor(KanaToHira(word[1]))}
      </div>
    </WordItem>
  );
}

export default Word;
