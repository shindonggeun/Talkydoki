import InfoDisplay from "./InfoDisplay";

type Props = {};

function MyAmount({}: Props) {
  return (
    <div className="MyAmountContainer">
      <InfoDisplay label="읽은 뉴스 문장" count="14" />
      <InfoDisplay label="진행한 회화" count="14" />
    </div>
  );
}

export default MyAmount;
