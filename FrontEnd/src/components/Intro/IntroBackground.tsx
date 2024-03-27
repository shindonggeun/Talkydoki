import { IntroBackgroundWrapper } from "@/styles/Intro/containers";
import BackgroundSection from "./contents/BackgroundSection";

type Props = {};

function IntroBackground({}: Props) {
  return (
    <IntroBackgroundWrapper>
      <BackgroundSection />
    </IntroBackgroundWrapper>
  );
}

export default IntroBackground;
