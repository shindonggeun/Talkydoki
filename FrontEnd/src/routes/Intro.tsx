import { Card } from "@/styles/common/ui/card";
import { Wrapper } from "@/styles/common/ui/container";
import { NegativeTitle } from "@/styles/common/ui/text";
import Button from "@mui/material/Button";
import AIChatCategory from "@/components/ui/AIChatCategory";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TextField from "@mui/material/TextField";

function Intro() {
  return (
    <>
      <Wrapper>
        <NegativeTitle>타이틀</NegativeTitle>
        <Button variant="contained" color="purple" fullWidth>
          버튼
        </Button>
        <Button variant="text" color="purple">
          버튼
        </Button>
        <Button variant="outlined">버튼</Button>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          color="purple"
          sx={{ backgroundColor: "var(--bg-modal)" }}
        />
        <AIChatCategory Icon={AcUnitIcon} title={"눈송이"} />
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
      </Wrapper>
    </>
  );
}

export default Intro;
