import TodaysVoca from "./RandomVoca";
import UserKeywordChart from "./UserKeywordChart";
import { SectionWrapper } from "@/styles/common/ui/container";

type Props = {};

function KeywordSection({}: Props) {
  return (
    <SectionWrapper>
      <UserKeywordChart />
      <TodaysVoca />
    </SectionWrapper>
  );
}

export default KeywordSection;
