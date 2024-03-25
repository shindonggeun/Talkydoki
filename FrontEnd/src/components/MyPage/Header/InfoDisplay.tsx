type Props = { label: string; count: string };

function InfoDisplay({ label, count }: Props) {
  return (
    <div className="ReadNewDiv">
      <div className="label">{label}</div>
      <div className="count">{count}개</div>
    </div>
  );
}

export default InfoDisplay;
