import { WordItem } from "@/styles/News/Detail/ui";
import { JptoKor, KanaToHira } from "@/util/language/japanese";

type Props = {
  word: string[];
  isReadOn?: boolean;
  isReadKrOn?: boolean;
};

function Word({ word, isReadOn, isReadKrOn }: Props) {
  const read = KanaToHira(word[1] ? word[1] : word[0]);
  const japanese = word[0];
  const readKor = JptoKor(read);

  return (
    <WordItem>
      <div className={`read ${isReadOn && "show"}`}>{read}</div>
      <div className="japanese">{japanese}</div>
      <div className={`readKor ${isReadKrOn && "show"}`}>{readKor}</div>
    </WordItem>
  );
}

export default Word;
