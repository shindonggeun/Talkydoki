import { IntroSidebarWrapper } from "@/styles/Intro/containers";
import TextLogo from "@/assets/images/logo_text_light.png";
import ImageLogo from "@/assets/images/logo_face2.png";

type Props = {};

function IntroSidebar({}: Props) {
  return (
    <IntroSidebarWrapper>
      <img src={TextLogo} alt="logo" className="textLogo" />
      <img src={ImageLogo} alt="logo" className="imageLogo" />
    </IntroSidebarWrapper>
  );
}

export default IntroSidebar;
