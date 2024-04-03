import { PersonalVocaInterface } from "@/interface/VocaInterface";
import { useDeleteMyVoca } from "@/api/vocaApi";

import { JptoKor } from "@/util/language/japanese";
import { splitMeaning } from "@/util/language/voca";

import { VocaCard } from "@/styles/User/MyVoca";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  voca: PersonalVocaInterface;
  isReadOn: boolean;
  isMeaningOn: boolean;
};

function MyVocaCard({ voca, isReadOn, isMeaningOn }: Props) {
  const { personalVocabularyId, japanese, type, japaneseRead, korean } = voca;
  const { mutate: deleteVoca } = useDeleteMyVoca(japanese);

  return (
    <VocaCard key={personalVocabularyId}>
      <ClearIcon
        className="deleteNadd"
        onClick={() => {
          deleteVoca(personalVocabularyId);
        }}
      />

      {/* 일본어 */}
      <div className="jpNtype">
        <div
          className="japanese"
          style={japanese.length > 3 ? { fontSize: "20pt" } : undefined}
        >
          {japanese}{" "}
        </div>
        <div className="type">{type}</div>
      </div>

      {/* 발음/의미 */}
      <div className="readNmean">
        <div className={`read ${isReadOn ? undefined : "hide"}`}>
          <div>{japaneseRead} | </div>
          <div>{JptoKor(japaneseRead)}</div>
        </div>
        <div className={`meaning ${isMeaningOn ? undefined : "hide"}`}>
          {splitMeaning(korean).map((mean, idx) => (
            <div key={idx}>{mean}</div>
          ))}
        </div>
      </div>
    </VocaCard>
  );
}

export default MyVocaCard;
