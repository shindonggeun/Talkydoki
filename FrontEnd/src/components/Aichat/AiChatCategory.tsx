import { useChatStart, useCreateChatRoom } from "@/api/chatApi";
import { Categorybox, NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { AiChatCard } from "@/styles/common/ui/card";
import { useNavigate } from "react-router-dom";

type Props = {};

function AiChatCategory({}: Props) {
  const navigate = useNavigate();

  // const goAiChatRoom = (category: string) => {
  //   navigate(`/aichatlist/${category}`);
  // };

  const { mutate: createChatRoom } = useCreateChatRoom();
  const { mutate: chatStart } = useChatStart();

  const handleCategorySelect = (category: string) => {
    createChatRoom(category, {
      onSuccess: (data) => {
        console.log("data", data);
        const roomId = data.data.dataBody.id; // API 응답 구조에 따라 조정 필요
        console.log("roomId", roomId);
        chatStart(
          { roomId, category },
          {
            onSuccess: () => {
              navigate(`/aichatlist/${category}/${roomId}`);
            },
            onError: (error) => {
              console.error("Error during chat setup:", error);
              // 채팅방 초기 설정 에러 처리
            },
          }
        );
      },
      onError: (error) => {
        console.error("Error creating chat room:", error);
        // 채팅방 생성 에러 처리
      },
    });
  };

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
