import { Wrapper } from "@/styles/common/ui/container";
import { useNavigate } from "react-router-dom";

type Props = {};

function MyPage({}: Props) {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <button onClick={() => navigate("myvoca")}>단어장</button>
      <button onClick={() => navigate("update")}>프로필 수정</button>
    </Wrapper>
  );
}

export default MyPage;
