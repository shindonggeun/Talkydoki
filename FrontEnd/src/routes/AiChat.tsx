import React, { useState, useEffect } from 'react';
import { connectStompClient, getStompClient } from '@/util/websocket/stompConnection';
import { getCookie } from '@/util/auth/userCookie';
import { Wrapper } from '@/styles/common/ui/container';

type ChatMessage = {
  content: string;
};

const { VITE_REACT_WS_URL } = import.meta.env;

const AiChat: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [chatText, setChatText] = useState<string>('');

  // 여기에 이제 roomId 동적으로 할당받아야함
  const roomId = 1;

  useEffect(() => {
    const serverURL = VITE_REACT_WS_URL;
    const token = getCookie();
    console.log(token);

    const onConnected = () => {
      setIsConnected(true);
      const subscription = getStompClient()?.subscribe(`/topic/room.${roomId}`, message => {
        const chat = JSON.parse(message.body);
        setChats(prev => [...prev, chat]);
      });

      return subscription?.unsubscribe;
    };

    const onError = (error: string) => {
      console.error("Connection error: ", error);
    };

    connectStompClient(serverURL, token, onConnected, onError);

    return () => {
      getStompClient()?.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    const token = getCookie();

    if (chatText.trim() !== '') {
      const message = {
        sender: "USER",
        content: chatText,
      };

      getStompClient()?.send(`/pub/ai/chat/${roomId}`, JSON.stringify(message), {
        Authorization: `Bearer ${token}`
      });
      setChatText('');
    }
  };

  return (
    <Wrapper>

    <div className="chat-container">
      <div className="chat-scroll">
        {chats.map((chat) => (
              <div className="message-content">
                {chat.content}
              </div>
        ))}
      </div>
      <div className="input-box">
        <textarea
          className="input-text"
          value={chatText}
          onChange={(e) => setChatText(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요"
        />
      </div>
    </div>
    </Wrapper>
  );
};

export default AiChat;
