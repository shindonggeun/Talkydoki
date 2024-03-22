import {
  FooterContainer,
  HeaderContainer,
  JandiContainer,
  MainContainer,
  MyPageWrapper,
  ProfileContainer,
} from "@/styles/User/Mypage";
import { useNavigate } from "react-router-dom";

type Props = {};

function MyPage({}: Props) {
  const navigate = useNavigate();

  return (
    <MyPageWrapper>
      <ProfileContainer>
        {" "}
        <button onClick={() => navigate("update")}>프로필 수정</button>
      </ProfileContainer>
      <HeaderContainer> </HeaderContainer>

      <JandiContainer>1</JandiContainer>

      <MainContainer>
        1<button onClick={() => navigate("myvoca")}>단어장</button>
      </MainContainer>

      <FooterContainer>1</FooterContainer>
    </MyPageWrapper>
  );
}

export default MyPage;
