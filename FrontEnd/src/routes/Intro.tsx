import React from "react";
import { Card } from "@/styles/ui/card";
import { NavbarWrapper, SidebarWrapper, Wrapper } from "@/styles/ui/container";
import { NegativeTitle } from "@/styles/ui/text";
import Button from "@mui/material/Button";

function Intro() {
  return (
    <>
      <NavbarWrapper />
      <SidebarWrapper>asd</SidebarWrapper>
      <Wrapper>
        <NegativeTitle>타이틀</NegativeTitle>
        <Button variant="contained" color="purple">
          버튼
        </Button>
        <Button variant="text" color="purple">
          버튼
        </Button>
        <Button variant="outlined">버튼</Button>
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
        <Card>asdfasdf</Card>
      </Wrapper>
    </>
  );
}

export default Intro;
