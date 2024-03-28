import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../ChatHeader";
import ChatMain from "./ChatMain";
import ChatFooter from "./ChatFooter";
import ChatTip from "./ChatTip";
import { ChatRoomContainer } from "@/styles/Aichat/AiChatRoom";

// 환경변수에서 웹소켓 서버의 URL을 가져옵니다.

// 예시 붙이는용
const { VITE_REACT_WS_URL } = import.meta.env;
import { Client, Frame } from "webstomp-client";
import { getCookie } from "@/util/auth/userCookie";

import {
  connectStompClient,
  getStompClient,
} from "@/util/websocket/stompConnection";
import { useAiChatStore } from "@/stores/aichatStore";

export type ChatMessage = {
  sender: "USER" | "GPT" | "USER_TIP";
  japanese: string;
  korean?: string | null;
};
function ChatRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [lastUserTip, setLastUserTip] = useState<ChatMessage | null>(null);
  console.log(chats);

  // 전역 상태 관리
  const globalIsTranslate = useAiChatStore((state) => state.globalIsTranslate);
  const setGlobalIsTranslate = useAiChatStore(
    (state) => state.setGlobalIsTranslate
  );
  const globalIsTip = useAiChatStore((state) => state.globalIsTip);
  const setGlobalIsTip = useAiChatStore((state) => state.setGlobalIstip);

  // 번역표시 팁표시 기능 추가 필요
  const options = [
    {
      label: "번역표시",
      checked: globalIsTranslate,
      onChange: () => setGlobalIsTranslate(),
    },
    { label: "팁표시", checked: globalIsTip, onChange: () => setGlobalIsTip() },
    { label: "나가기" },
  ];

  useEffect(() => {
    const serverURL = VITE_REACT_WS_URL as string;
    const token = getCookie();

    const onConnected = (client: Client) => {
      console.log("연결성공");

      const subscription = client.subscribe(
        `/topic/room.${roomId}`,
        (message) => {
          console.log("오고가는 메세지", message);
          const chat = JSON.parse(message.body) as ChatMessage;
          if (chat.sender === "USER_TIP") {
            setLastUserTip(chat); // 마지막 USER_TIP 메시지를 저장
          }

          setChats((prev) => [...prev, chat]);
          console.log("갱신된 채팅 리스트", chats);
        }
      );

      return () => subscription.unsubscribe();
    };

    const onError = (error: Frame | string) => {
      if (typeof error === "string") {
        console.error("Connection string error: ", error);
      } else {
        console.error("Connection frame error: ", error.headers.message);
      }
    };

    // 웹소켓 연결을 시도
    connectStompClient(serverURL, token, onConnected, onError);

    // 컴포넌트 언마운트 시 웹소켓 연결을 종료
    return () => {
      getStompClient()?.disconnect();
    };
  }, [roomId]);

  return (
    <>
      <ChatRoomContainer>
        <ChatHeader aiChatTitle="AI 회화 채팅" options={options} />
        <ChatMain messages={chats} />
        <ChatFooter roomId={roomId} />
        <ChatTip lastUserTip={lastUserTip} />
      </ChatRoomContainer>
    </>
  );
}

export default ChatRoom;
