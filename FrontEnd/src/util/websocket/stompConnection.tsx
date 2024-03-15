// stompClient.ts
import { Client, Frame, over } from 'webstomp-client';

export type StompClient = Client | null;

// 연결 성공 시 호출될 콜백 함수의 타입 정의
export type OnConnectedCallback = (client: Client) => void;

// 연결 에러 시 호출될 콜백 함수의 타입 정의
export type OnErrorCallback = (error: Frame | string) => void;

let stompClient: StompClient = null;

// STOMP 클라이언트 연결 함수
export const connectStompClient = (
  serverURL: string,
  token: string,
  onConnected: OnConnectedCallback,
  onError: OnErrorCallback
): void => {
  const socket = new WebSocket(serverURL);
  const client = over(socket);

  const headers = {
    'Authorization': `Bearer ${token}`,
  };

  // 수정된 connect 호출 부분
  client.connect(headers, (frame?: Frame) => {
    console.log('WebSocket Stomp 연결: ', frame);
    if (frame) {
      onConnected(client);
    }
  }, (error: Frame | CloseEvent) => {
    onError(error instanceof Frame ? error : 'CloseEvent');
  });

  stompClient = client;
}


// STOMP 클라이언트 객체를 가져오는 함수
export const getStompClient = (): StompClient => stompClient;
