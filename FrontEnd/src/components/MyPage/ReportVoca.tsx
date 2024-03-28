import NewsReport from "./ReportVoca/NewsReport";
import MyVocaSimple from "./ReportVoca/MyVocaSimple";
import { ReportVocaWrapper } from "@/styles/Mypage/components";
import { UserAchievementInterface } from "@/interface/UserInterface";

type Props = {
  data: UserAchievementInterface;
};

function ReportVoca({ data }: Props) {
  return (
    <ReportVocaWrapper>
      <NewsReport average={data.averageScore} user={data.userScore} />
      <MyVocaSimple />
    </ReportVocaWrapper>
  );
}

export default ReportVoca;
