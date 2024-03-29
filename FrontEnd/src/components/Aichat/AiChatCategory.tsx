import { useCreateChatRoom } from "@/api/chatApi";
import { Categorybox, NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { AiChatCard } from "@/styles/common/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";

type Props = {};

function AiChatCategory({}: Props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: createChatRoom } = useCreateChatRoom();
  const handleCategorySelect = (category: string) => {
    setIsLoading(true);
    createChatRoom(category, {
      onSuccess: (data) => {
        console.log("data", data);
        const roomId = data.data.dataBody.id; // API 응답 구조에 따라 조정 필요
        console.log("roomId", roomId);
        setIsLoading(false);
        navigate(`/aichatlist/${category}/${roomId}`);
        // chatStart(
        //   { roomId, category },
        //   {
        //     onSuccess: () => {
        //       setIsLoading(false);
        //       navigate(`/aichatlist/${category}/${roomId}`);
        //     },
        //     onError: (error) => {
        //       console.error("Error during chat setup:", error);
        //       setIsLoading(false);
        //       // 채팅방 초기 설정 에러 처리
        //     },
        //   }
        // );
      },
      onError: (error) => {
        console.error("Error creating chat room:", error);
        setIsLoading(false);
        // 채팅방 생성 에러 처리
      },
    });
  };
  if (isLoading) {
    // 로딩 상태면 로딩 컴포넌트 렌더링
    return <Loading />;
  }

  return (
    <>
      <div className="titleBox">
        <NegativeTiTle>회화 리포트</NegativeTiTle>
      </div>
      <Categorybox>
        <AiChatCard onClick={() => handleCategorySelect("SOCIETY")}>
          Society
        </AiChatCard>
        <AiChatCard onClick={() => handleCategorySelect("ECONOMY")}>
          Economy
        </AiChatCard>
        <AiChatCard onClick={() => handleCategorySelect("HAMBURGER_ORDER")}>
          HAMBURGER_ORDER
        </AiChatCard>
        <AiChatCard onClick={() => handleCategorySelect("HEALTH")}>
          Health
        </AiChatCard>
        <AiChatCard onClick={() => handleCategorySelect("SPORTS")}>
          Sports
        </AiChatCard>
        <AiChatCard onClick={() => handleCategorySelect("ENTERTAINMENT")}>
          Entertainment
        </AiChatCard>
      </Categorybox>
    </>
  );
}

export default AiChatCategory;
