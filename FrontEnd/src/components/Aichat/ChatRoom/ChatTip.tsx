import { useAiChatStore } from "@/stores/aichatStore";
import { ChatTipContainer } from "@/styles/Aichat/AiChatRoom";
import { useEffect, useState } from "react";

type Props = {};

function ChatTip({}: Props) {
  const globalIsTip = useAiChatStore((state) => state.globalIsTip);
  const [isTip, setIstip] = useState(globalIsTip);
  console.log("isTip:", isTip);

  useEffect(() => {
    setIstip(globalIsTip);
  }, [globalIsTip]);

  return (
    <>
      {isTip ? (
        <ChatTipContainer onClick={() => setIstip(!isTip)}>
          <div className="message-record">녹음버튼을 누르고 말해주세요</div>
          <div className="message-suggest">TIP 다음과 같이 말해보세요</div>

          <div className="message-text">
            ソウルの現在の天気は晴れです！,아리가또 고자이 마스
          </div>
        </ChatTipContainer>
      ) : (
        ""
      )}
    </>
  );
}

export default ChatTip;
