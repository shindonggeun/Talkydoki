import React, { useState, useEffect } from "react";
import { Client, Frame } from "webstomp-client";
import {
  connectStompClient,
  getStompClient,
} from "@/util/websocket/stompConnection";
import { getCookie } from "@/util/auth/userCookie";
import { Wrapper } from "@/styles/common/ui/container";

type ChatMessage = {
  content: string;
};

const { VITE_REACT_WS_URL } = import.meta.env;

const AiChat: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [chatText, setChatText] = useState<string>("");

  const roomId = 1; // 나중에 동적으로 할당받도록 로직 구현 필요

  useEffect(() => {
    const serverURL = VITE_REACT_WS_URL as string; // 환경변수가 undefined일 수 없으므로 assertion
    const token = getCookie();

    const onConnected = (client: Client) => {
      const subscription = client.subscribe(
        `/topic/room.${roomId}`,
        (message) => {
          const chat = JSON.parse(message.body) as ChatMessage;
          setChats((prev) => [...prev, chat]);
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

    connectStompClient(serverURL, token, onConnected, onError);

    return () => {
      getStompClient()?.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    const token = getCookie();

    if (chatText.trim() !== "") {
      const message = {
        sender: "USER",
        content: chatText,
      };

      getStompClient()?.send(
        `/pub/ai/chat/${roomId}`,
        JSON.stringify(message),
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setChatText("");
    }
  };

  return (
    <Wrapper>
      <div className="chat-container">
        <div className="chat-scroll">
          {chats.map((chat, index) => (
            <div key={index} className="message-content">
              {chat.content}
            </div>
          ))}
        </div>
        <div className="input-box">
          <textarea
            className="input-text"
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && sendMessage()}
            placeholder="메시지를 입력하세요"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default AiChat;
