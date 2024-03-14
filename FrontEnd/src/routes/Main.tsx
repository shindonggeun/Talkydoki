import { Wrapper } from "@/styles/common/ui/container";

import ChatIcons from "@/components/Main/ChatIcons";
import TodaysNews from "@/components/Main/TodaysNews";
import KeywordSection from "@/components/Main/KeywordSection";

function Main() {
  return (
    <Wrapper>
      <TodaysNews />
      <ChatIcons />
      <KeywordSection />
    </Wrapper>
  );
}

export default Main;
