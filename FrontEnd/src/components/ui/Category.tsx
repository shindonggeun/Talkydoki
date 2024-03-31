import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { useIsMobile } from "@/stores/displayStore";
import { NegativeTitle } from "@/styles/common/ui/text";
import { AiCatagoryCard } from "@/styles/Aichat/AiChatList";

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
  onClick: () => void;
};

// AI  채팅 카테고리 버튼 컴포넌트

function Category({ Icon, title, onClick }: Props) {
  const isMoble = useIsMobile();

  return (
    <AiCatagoryCard onClick={onClick}>
      <NegativeTitle
        style={
          isMoble
            ? { fontSize: "12pt", maxWidth: "90%" }
            : { fontSize: "18pt", maxWidth: "90%" }
        }
      >
        {title}
      </NegativeTitle>
      <p className="categoryName" style={{ marginTop: "4px" }}></p>
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
              ? { fill: "url(#gradient_svg)", fontSize: 105 }
              : { fill: "url(#gradient_svg)", fontSize: 150 }
          }
        />
      </div>
    </AiCatagoryCard>
  );
}

export default Category;
