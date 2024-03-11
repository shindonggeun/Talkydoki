import { Card } from "@/styles/ui/card";
import { Wrapper } from "@/styles/ui/container";
import { NegativeTitle } from "@/styles/ui/text";
import Button from "@mui/material/Button";
import AIChatCategory from "@/components/ui/AIChatCategory";
import AcUnitIcon from "@mui/icons-material/AcUnit";

function Intro() {
  return (
    <>
      <Wrapper>
        <NegativeTitle>타이틀</NegativeTitle>
        <Button variant="contained" color="purple">
          버튼
        </Button>
        <Button variant="text" color="purple">
          버튼
        </Button>
        <Button variant="outlined">버튼</Button>
        <AIChatCategory Icon={AcUnitIcon} title={"눈송이"} />
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
      </Wrapper>
    </>
  );
}

export default Intro;
