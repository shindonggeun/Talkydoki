import AiChatCategory from "@/components/Aichat/AiChatCategory";
import MyChatGraph from "@/components/Aichat/ChatList/MyChatGraph";
import { Wrapper } from "@/styles/common/ui/container";
import { NegativeTitle } from "@/styles/common/ui/text";

type Props = {};

function AiChatList({}: Props) {
  return (
    <Wrapper>
      <NegativeTitle>AI 채팅</NegativeTitle>
      <MyChatGraph />
      <AiChatCategory />
    </Wrapper>
  );
}

export default AiChatList;
