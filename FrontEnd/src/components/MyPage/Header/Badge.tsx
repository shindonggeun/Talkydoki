import { BadgeContainer } from "@/styles/Mypage/ui";

type Props = {
  icon: string;
  tier: string;
};

function Badge({ icon, tier }: Props) {
  return (
    <BadgeContainer>
      <div className="myRank">현재 나의 등급은</div>
      <div className="tierText">{tier}</div>
      <img src={icon} alt="tier" className="badge" />
    </BadgeContainer>
  );
}

export default Badge;
