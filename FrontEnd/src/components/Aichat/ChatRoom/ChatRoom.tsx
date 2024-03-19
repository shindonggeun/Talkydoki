import { ChatRoomContainer } from "@/styles/Aichat/AiChatRoom";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";

type Props = {};

function ChatRoom({}: Props) {
  return (
    <>
      <ChatRoomContainer>
        <ChatHeader />
        <ChatMain />
        <ChatFooter />
      </ChatRoomContainer>
    </>
  );
}

export default ChatRoom;
