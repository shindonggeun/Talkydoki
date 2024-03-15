import { Categorybox, NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { AiChatCard } from "@/styles/common/ui/card";

type Props = {};

function AiChatCategory({}: Props) {
  return (
    <>
      <div className="titleBox">
        <NegativeTiTle>회화 리포트</NegativeTiTle>
      </div>
      <Categorybox>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
        <AiChatCard></AiChatCard>
      </Categorybox>
    </>
  );
}

export default AiChatCategory;
