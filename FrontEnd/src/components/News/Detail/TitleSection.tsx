import ThumbnailView from "@/components/ui/ThumbnailView";
import { Divider } from "@mui/material";

type Props = {
  title: string;
  url: string;
  date: string;
  images: string[];
};

function TitleSection({ title, url, date, images }: Props) {
  return (
    <>
      <h1 style={{ fontWeight: 900 }}>{title}</h1>
      <div className="info">작성일: {date.slice(0, 10)}</div>
      <div className="info">url: {url}</div>
      <Divider sx={{ margin: "2vh 0" }} />
      <div style={{ margin: "10vh 0" }}>
        <ThumbnailView images={images} isThumb={false} />
      </div>
    </>
  );
}

export default TitleSection;
