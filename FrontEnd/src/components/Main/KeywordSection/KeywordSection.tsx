import RandomVoca from "./RandomVoca";
import UserKeywordChart from "./UserKeywordChart";
import { SectionWrapper } from "@/styles/common/ui/container";

// 나의 키워드 / 오늘의 랜덤 단어 표시 라인
function KeywordSection() {
  return (
    <SectionWrapper>
      <UserKeywordChart />
      <RandomVoca />
    </SectionWrapper>
  );
}

export default KeywordSection;
