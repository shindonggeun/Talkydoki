import MypageHeader from "@/components/MyPage/MypageHeader";
import ReportVoca from "@/components/MyPage/ReportVoca";
import Jandi from "@/components/MyPage/Jandi/Jandi";
import { Wrapper } from "@/styles/common/ui/container";
import { useGetUserAchievement } from "@/api/profileApi";

function MyPage() {
  const { data } = useGetUserAchievement();

  if (!data) return;

  return (
    <Wrapper>
      <MypageHeader
        totalTalked={data.totalTalked}
        totalShaded={data.totalShaded}
      />
      <Jandi />
      <ReportVoca data={data} />
    </Wrapper>
  );
}

export default MyPage;
