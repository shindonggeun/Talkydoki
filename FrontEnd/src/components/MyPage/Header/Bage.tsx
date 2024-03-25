import { MyPageCard } from "@/styles/User/Mypage";
import chatbot from "@/assets/images/tierlogo/logo_41.png";

type Props = {};

function Bage({}: Props) {
  return (
    <div className="BageContainer">
      <MyPageCard>
        <img src={chatbot} alt="Chatbot" className="imgdiv" />
      </MyPageCard>
    </div>
  );
}

export default Bage;
