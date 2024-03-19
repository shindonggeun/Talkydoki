import ChatRoom from "@/components/Aichat/ChatRoom/ChatRoom";
import { Flexbox, Wrapper } from "@/styles/Aichat/AiChatRoom";
import React from "react";

type Props = {};

function AiChatRoom({}: Props) {
  return (
    <>
      <Wrapper>
        <Flexbox>
          <ChatRoom></ChatRoom>
        </Flexbox>
      </Wrapper>
    </>
  );
}

export default AiChatRoom;
