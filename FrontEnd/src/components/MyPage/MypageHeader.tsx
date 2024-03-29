import { HeaderSection } from "@/styles/Mypage/components";

import { Divider } from "@mui/material";
import InfoDisplay from "./Header/InfoDisplay";
import Badge from "./Header/Badge";
import { NegativeTitle } from "@/styles/common/ui/text";
import { userRank } from "@/interface/UserInterface";

type Props = {
  totalTalked: number;
  totalShaded: number;
};

function MypageHeader({ totalShaded, totalTalked }: Props) {
  const rank =
    Math.floor((totalShaded + totalTalked) / 15) > 4
      ? 3
      : Math.floor((totalShaded + totalTalked) / 15);

  return (
    <HeaderSection>
      <div className="menu">
        <NegativeTitle>마이 데이터</NegativeTitle>
      </div>
      <div className="achievement">
        <div className="counts">
          <InfoDisplay label="읽은 뉴스 문장" count={totalShaded} />
          <Divider flexItem orientation="vertical" />
          <InfoDisplay label="진행한 회화" count={totalTalked} />
        </div>
        <Divider flexItem orientation="vertical" />
        <Badge icon={userRank[rank].icon} tier={userRank[rank].rank} />
      </div>
    </HeaderSection>
  );
}

export default MypageHeader;
