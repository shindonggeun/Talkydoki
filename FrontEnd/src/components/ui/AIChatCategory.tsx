import { AiChatCard } from "@/styles/common/ui/card";
import { useIsMobile } from "@/stores/displayStore";
import { useCreateChatRoom } from "@/api/chatApi";
import { useNavigate } from "react-router";

// 아이콘불러오기
import HotelIcon from "@mui/icons-material/Hotel";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";

const iconMappings = [
  null,
  HotelIcon,
  SportsSoccerIcon,
  FastfoodIcon,
  ContentCutIcon,
  VaccinesIcon,
  LocalPoliceIcon,
  AccessibilityNewIcon,
  FavoriteIcon,
  BrunchDiningIcon,
];

type Props = {
  iconId: number;
  title: string;
  Category: string;
};

// AI  채팅 카테고리 버튼 컴포넌트

function ChatCategory({ iconId, title, Category }: Props) {
  const isMoble = useIsMobile();
  const { mutate: createChatRoom } = useCreateChatRoom();
  const navigate = useNavigate();
  const Icon = iconMappings[iconId];
  const handleCategorySelect = (category: string) => {
    createChatRoom(category, {
      onSuccess: (data) => {
        const roomId = data.data.dataBody.id; // API 응답 구조에 따라 조정 필요
        navigate(`/aichatlist/${category}`, { state: { roomId: roomId } });
      },
      onError: (error) => {
        console.error("Error creating chat room:", error);
      },
    });
  };

  if (!Icon) return null;

  return (
    <AiChatCard
      onClick={() => {
        handleCategorySelect(Category);
      }}
    >
      <div className="inner">
        <svg width={0} height={0}>
          <linearGradient id="gradient_svg" x1="0" x2="0.4" y1="1" y2="0.4">
            <stop offset={0} stopColor="var(--blue)" stopOpacity={0.9} />
            <stop offset={1} stopColor="var(--main)" stopOpacity={0.9} />
          </linearGradient>
        </svg>
        <Icon
          sx={
            isMoble
              ? { fill: "url(#gradient_svg)", fontSize: 60 }
              : { fill: "url(#gradient_svg)", fontSize: 100 }
          }
        />
      </div>
      <div className="categoryName">{title}</div>
    </AiChatCard>
  );
}

export default ChatCategory;
