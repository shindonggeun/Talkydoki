import { useCreateChatRoom } from "@/api/chatApi";
import { Categorybox, NegativeTiTle } from "@/styles/Aichat/AiChatList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../ui/Loading";
import Category from "../ui/Category";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
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
      },
      onError: (error) => {
        console.error("Error creating chat room:", error);
        setIsLoading(false);
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
        <NegativeTiTle>초급 회화</NegativeTiTle>
      </div>
      <Categorybox>
        <Category
          Icon={LocalConvenienceStoreIcon}
          title={"편의점에서 잔돈받기"}
          onClick={() => handleCategorySelect("ECONOMY")}
        ></Category>
        <Category
          Icon={SportsSoccerIcon}
          title={"축구 대화 하기"}
          onClick={() => handleCategorySelect("SOCIETY")}
        ></Category>
        <Category
          Icon={FastfoodIcon}
          title={"  햄버거 주문하기"}
          onClick={() => handleCategorySelect("HAMBURGER_ORDER")}
        ></Category>
      </Categorybox>

      <div className="titleBox">
        <NegativeTiTle>중급 회화</NegativeTiTle>
      </div>
      <Categorybox>
        <Category
          Icon={ContentCutIcon}
          title={"미용실에서 머리자르기"}
          onClick={() => handleCategorySelect("SPORTS")}
        ></Category>
        <Category
          Icon={VaccinesIcon}
          title={"병원에서 몸상태 말하기"}
          onClick={() => handleCategorySelect("HEALTH")}
        ></Category>
        <Category
          Icon={LocalPoliceIcon}
          title={"경찰서에서 분실물 찾기"}
          onClick={() => handleCategorySelect("ENTERTAINMENT")}
        ></Category>
      </Categorybox>

      <div className="titleBox">
        <NegativeTiTle>상급 회화</NegativeTiTle>
      </div>
      <Categorybox>
        <Category
          Icon={AccessibilityNewIcon}
          title={"  사회적 토론하기"}
          onClick={() => handleCategorySelect("ENTERTAINMENT")}
        ></Category>
        <Category
          Icon={FavoriteIcon}
          title={"동료와 친해지기"}
          onClick={() => handleCategorySelect("ENTERTAINMENT")}
        ></Category>
        <Category
          Icon={BrunchDiningIcon}
          title={"브런치 식사 대화하기"}
          onClick={() => handleCategorySelect("ENTERTAINMENT")}
        ></Category>
      </Categorybox>
    </>
  );
}

export default AiChatCategory;
