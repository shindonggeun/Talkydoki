import ChatRoom from "@/components/Aichat/ChatRoom/ChatRoom";
import { ChatCard, ChatWrapper } from "@/styles/Aichat/AiChat";

type Props = {};

function AiChatRoom({}: Props) {
  return (
    <>
      <ChatWrapper>
        <ChatCard>
          <ChatRoom />
        </ChatCard>
      </ChatWrapper>
    </>
  );
}

export default AiChatRoom;
