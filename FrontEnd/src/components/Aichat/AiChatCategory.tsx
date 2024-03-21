import { Categorybox, NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { AiChatCard } from "@/styles/common/ui/card";
import { useNavigate } from "react-router-dom";

type Props = {};

function AiChatCategory({}: Props) {
  const navigate = useNavigate();

  const goAiChatRoom = () => {
    navigate("/aichatroom");
  };
  return (
    <>
      <div className="titleBox">
        <NegativeTiTle>회화 리포트</NegativeTiTle>
      </div>
      <Categorybox>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
        <AiChatCard onClick={goAiChatRoom}></AiChatCard>
      </Categorybox>
    </>
  );
}

export default AiChatCategory;
