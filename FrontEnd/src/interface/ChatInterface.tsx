// 메시지 데이터  인터페이스
export interface MessageData {
  sender: string;
  japanese: string;
  korean: null | string;
}

export interface SendMessagePayload {
  roomId: number | string | null; // roomId가 숫자 형태일 수도 있음을 고려
  data: MessageData;
}

export interface ChatStartPayload {
  roomId: string | number; // roomId가 숫자 형태일 수도 있음을 고려
  catagory: string;
}
