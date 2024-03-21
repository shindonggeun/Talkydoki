import { ChatTipContainer } from "@/styles/Aichat/AiChatRoom";

type Props = {};

function ChatTip({}: Props) {
  return (
    <ChatTipContainer>
      <div>녹음버튼을 누르고 말해주세요</div>
      <div>TIP 다음과 같이 말해보세요</div>

      <div>아리가또 고자이 마스(이부분 API 받아올 예정)</div>
    </ChatTipContainer>
  );
}

export default ChatTip;
