import { WordItem } from "@/styles/News/Detail/ui";
import { JptoKor, KanaToHira, hasMeaning } from "@/util/language/japanese";
import { useSetIsSearchOn, useSetSearchWord } from "@/stores/newsStore";

type Props = {
  word: string[];
  isReadOn?: boolean;
  isReadKrOn?: boolean;
};

function Word({ word, isReadOn, isReadKrOn }: Props) {
  const read = KanaToHira(word[1] ? word[1] : word[0]);
  const japanese = word[0];
  const readKor = JptoKor(read);
  const setSearchWord = useSetSearchWord();
  const setIsSearchOn = useSetIsSearchOn();

  const searchHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasMeaning(word[4])) return;
    setSearchWord({ word: word[3], read, x: e.clientX, y: e.clientY });
    setIsSearchOn(true);
  };

  return (
    <WordItem>
      <div className={`read ${isReadOn && "show"}`}>{read}</div>
      <div
        className={`japanese ${hasMeaning(word[4]) && "meaning"}`}
        onMouseUp={searchHandler}
      >
        {japanese}
      </div>
      <div className={`readKor ${isReadKrOn && "show"}`}>{readKor}</div>
    </WordItem>
  );
}

export default Word;
