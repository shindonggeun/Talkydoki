import AiChatCategory from "@/components/Aichat/AiChatCategory";
import { Flexbox } from "@/styles/Aichat/AiChatList";
import { Wrapper } from "@/styles/common/ui/container";

type Props = {};

function AiChatList({}: Props) {
  return (
    <Wrapper>
      <Flexbox>
        <AiChatCategory></AiChatCategory>
      </Flexbox>
    </Wrapper>
  );
}

export default AiChatList;
