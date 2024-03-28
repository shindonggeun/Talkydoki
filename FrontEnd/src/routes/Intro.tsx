import { IntroWrapper } from "@/styles/Intro/containers";
import IntroSidebar from "@/components/Intro/IntroSidebar";
import IntroContents from "@/components/Intro/IntroContents";
import IntroBackground from "@/components/Intro/IntroBackground";

type Props = {};

function Intro({}: Props) {
  return (
    <IntroWrapper>
      <IntroSidebar />
      <IntroContents />
      <IntroBackground />
    </IntroWrapper>
  );
}

export default Intro;
