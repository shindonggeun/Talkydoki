import { SendMessagePayload } from "@/interface/ChatInterface";
import { customAxios } from "@/util/auth/customAxios";
import { useMutation } from "@tanstack/react-query";

//룸아이디 수정필요 GPT 응답값받기 (팁메세지)
export const useSendMessage = () => {
  return useMutation({
    mutationFn: (payload: SendMessagePayload) => {
      console.log("Sending payload:", payload);
      return customAxios.post(`ai/chat/gpt/${payload.roomId}`, payload.data);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

// 채팅방 만들기
export const useCreateChatRoom = () => {
  // 초기설정 위해 훅 호출
  return useMutation({
    mutationFn: (payload: string) => {
      return customAxios.post(`ai/chat/room/create/${payload}`);
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

// 채팅방 초기설정
export const useChatStart = () => {
  return useMutation({
    mutationFn: ({
      roomId,
      category,
    }: {
      roomId: string;
      category: string;
    }) => {
      return customAxios.post(`ai/chat/gpt/setup/${roomId}/${category}`);
    },
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
