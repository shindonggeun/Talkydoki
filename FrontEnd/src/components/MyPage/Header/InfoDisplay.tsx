import { RecordContainer } from "@/styles/Mypage/ui";

type Props = { label: string; count: number };

function InfoDisplay({ label, count }: Props) {
  return (
    <RecordContainer>
      <div className="label">{label}</div>
      <div className="count">{count}개</div>
    </RecordContainer>
  );
}

export default InfoDisplay;
