import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import { AiChatCard } from "@/styles/common/ui/card";
import { useIsMobile } from "@/stores/displayStore";

type Props = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  title: string;
};

// AI  채팅 카테고리 버튼 컴포넌트

function Category({ Icon, title }: Props) {
  const isMoble = useIsMobile();

  return (
    <AiChatCard>
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
        <p className="categoryName" style={{ marginTop: "4px" }}>
          {title}
        </p>
      </div>
    </AiChatCard>
  );
}

export default Category;
