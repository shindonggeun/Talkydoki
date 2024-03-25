import {
  FooterContainer,
  HeaderContainer,
  JandiContainer,
  MainContainer,
  MyPageWrapper,
  ProfileContainer,
} from "@/styles/User/Mypage";
import { BlueButton } from "@/styles/common/ui/button";
import { useNavigate } from "react-router-dom";

type Props = {};

function MyPage({}: Props) {
  const navigate = useNavigate();

  return (
    <MyPageWrapper>
      <ProfileContainer>
        {" "}
        <BlueButton
          width="95px"
          height="33px"
          onClick={() => navigate("update")}
        >
          프로필 수정
        </BlueButton>
      </ProfileContainer>
      <HeaderContainer> </HeaderContainer>

      <JandiContainer>1</JandiContainer>

      <MainContainer>
        <BlueButton
          width="95px"
          height="33px"
          onClick={() => navigate("myvoca")}
        >
          단어장
        </BlueButton>
      </MainContainer>

      <FooterContainer>1</FooterContainer>
    </MyPageWrapper>
  );
}

export default MyPage;
