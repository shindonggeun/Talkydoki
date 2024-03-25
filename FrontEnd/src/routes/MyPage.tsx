import Bage from "@/components/MyPage/Header/Bage";
import MyAmount from "@/components/MyPage/Header/MyAmount";
import Jandi from "@/components/MyPage/Jandi/Jandi";
import NewsReport from "@/components/MyPage/Main/NewsReport";
import VocaReport from "@/components/MyPage/Main/VocaReport";
import {
  FooterSection,
  HeaderSection,
  JandiSection,
  MainSection,
  MyPageWrapper,
  ProfileSection,
} from "@/styles/User/Mypage";
import { BlueButton } from "@/styles/common/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {};

function MyPage({}: Props) {
  const navigate = useNavigate();

  return (
    <MyPageWrapper>
      <ProfileSection>
        {" "}
        <BlueButton
          width="95px"
          height="33px"
          onClick={() => navigate("update")}
        >
          프로필 수정
        </BlueButton>
      </ProfileSection>
      <HeaderSection>
        <MyAmount />
        <Bage />
      </HeaderSection>

      <JandiSection>
        <Jandi></Jandi>
      </JandiSection>

      <MainSection>
        <NewsReport />
        {/* <VocaReport onClick={() => navigate("myvoca")} /> */}
      </MainSection>

      <FooterSection>1</FooterSection>
    </MyPageWrapper>
  );
}

export default MyPage;
