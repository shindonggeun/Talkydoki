import { BackgroundSectionWrapper } from "@/styles/Intro/containers";
import { TextFlow } from "@/styles/Intro/ui";

type Props = {};

function BackgroundSection({}: Props) {
  const message =
    "おはようございますこんにちはこんばんはよろしくお願いしますお誕生日おめでとうありがとういいお年を愛してるお母さんお父さんお姉さんお兄さん大好き";

  return (
    <BackgroundSectionWrapper>
      <TextFlow>
        <div className="track">
          <span className="text">{message}</span>
          <span className="text">{message}</span>
        </div>
      </TextFlow>
    </BackgroundSectionWrapper>
  );
}

export default BackgroundSection;
