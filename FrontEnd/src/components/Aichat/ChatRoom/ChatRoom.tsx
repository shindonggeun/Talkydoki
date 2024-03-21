import { ChatRoomContainer } from "@/styles/Aichat/AiChatRoom";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";
import ChatTip from "./ChatTip";

type Props = {};

function ChatRoom({}: Props) {
  return (
    <>
      <ChatRoomContainer>
        <ChatHeader />
        <ChatMain />
        <ChatFooter />
        <ChatTip />
      </ChatRoomContainer>
    </>
  );
}

export default ChatRoom;
