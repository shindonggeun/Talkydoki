import { MainContainer } from "@/styles/Aichat/AiChatRoom";
import chatbot from "@/assets/images/logo_face.png";
import TranslateIcon from "@mui/icons-material/Translate";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import env from "@/interface/SttInterface";
type Props = {};

function ChatMain({}: Props) {
  //  채팅 api 나오면 컴포넌트 분리 예정
  const client = new PollyClient({
    region: env.awsRegion,
    credentials: {
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
    },
  });

  const synthesizeSpeech = async (text: string) => {
    const params = {
      Text: text,
      OutputFormat: "mp3",
      VoiceId: "Takumi",
    };

    try {
      const { AudioStream } = await client.send(
        new SynthesizeSpeechCommand(params)
      );
      if (AudioStream) {
        console.log("AudioStream", AudioStream);
        // ReadableStream을 Web Stream으로 변환
        const webStream = AudioStream.transformToWebStream();

        // Blob으로 변환
        const response = new Response(webStream);
        const audioBlob = await response.blob();

        // Blob을 이용해 오디오 URL 생성
        const audioUrl = URL.createObjectURL(audioBlob);

        // Audio 객체를 사용하여 음성 재생
        const audio = new Audio(audioUrl);
        console.log(audio);
        audio.play();

        // 재생이 완료되면 URL 해제
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  const messages = [
    {
      id: 1,
      text: "안녕하세요, 무엇을 도와드릴까요?",
      japanese: "こんにちは何を助けますか？",
      sender: "chatbot",
    },
    {
      id: 2,
      text: "오늘 날씨가 어때요?",
      japanese: "今日の天気はどうですか？",
      sender: "user",
    },
    {
      id: 3,
      text: "서울의 현재 날씨는 맑음입니다!",
      japanese: "ソウルの現在の天気は晴れです！",
      sender: "chatbot",
    },
    {
      id: 4,
      text: "감사합니다!",
      japanese: "ありがとうございます！",
      sender: "user",
    },
    {
      id: 1,
      text: "안녕하세요, 무엇을 도와드릴까요?",
      japanese: "ありがとうございます！",
      sender: "chatbot",
    },
    {
      id: 2,
      text: "오늘 날씨가 어때요?",
      japanese: "ありがとうございます！",
      sender: "user",
    },
    {
      id: 3,
      text: "서울의 현재 날씨는 맑음입니다!",
      japanese: "ソウルの現在の天気は晴れです！",
      sender: "chatbot",
    },
    {
      id: 4,
      text: "감사합니다!",
      japanese: "ヤクルトの５年目、奥川恭伸投手（２２）",
      sender: "user",
    },
  ];
  return (
    <>
      <MainContainer>
        {/* {messages.map((message) => (
          <div
            key={message.id}
            className={`message-item ${
              message.sender === "user" ? "self" : ""
            }`}
          >
            {message.sender !== "user" && (
              <div className="chatbot-icon-container">
                <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
              </div>
            )}
            <div className="message-text">{message.text}</div>
            <div className="message-text">{message.japanese}</div>

            <div className="buttonbox">
              <VolumeUpIcon
                style={{ fontSize: "17px", cursor: "pointer" }}
                onClick={() => synthesizeSpeech(message.japanese)}
              />
              <TranslateIcon style={{ fontSize: "17px", cursor: "pointer" }} />
            </div>
          </div>
        ))} */}
        {messages.map((message) =>
          message.sender === "chatbot" ? (
            <div className="message-item chatbot">
              <div className="chatbot-icon-container">
                <img src={chatbot} alt="Chatbot" className="chatbot-icon" />
              </div>
              <div key={message.id} className="message-item chat">
                <div className="message-text">{message.text}</div>
                <div className="message-text">{message.japanese}</div>
                <div className="buttonbox">
                  <VolumeUpIcon
                    style={{ fontSize: "17px", cursor: "pointer" }}
                    onClick={() => synthesizeSpeech(message.japanese)}
                  />
                  <TranslateIcon
                    style={{ fontSize: "17px", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div key={message.id} className="message-item self">
              <div className="message-text">{message.text}</div>
              <div className="message-text">{message.japanese}</div>
              <div className="buttonbox">
                <VolumeUpIcon
                  style={{ fontSize: "17px", cursor: "pointer" }}
                  onClick={() => synthesizeSpeech(message.japanese)}
                />
                <TranslateIcon
                  style={{ fontSize: "17px", cursor: "pointer" }}
                />
              </div>
            </div>
          )
        )}
      </MainContainer>
    </>
  );
}

export default ChatMain;
