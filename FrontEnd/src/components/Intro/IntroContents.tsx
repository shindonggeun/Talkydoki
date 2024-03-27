import { IntroContentsWrapper } from "@/styles/Intro/containers";
import React from "react";
import IntroSection from "./contents/IntroSection";
import PageSection from "./contents/PageSection";

type Props = {};

function IntroContents({}: Props) {
  return (
    <IntroContentsWrapper>
      <IntroSection />
      <PageSection />
    </IntroContentsWrapper>
  );
}

export default IntroContents;
