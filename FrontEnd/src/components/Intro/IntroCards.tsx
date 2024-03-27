import { IntroSection } from "@/styles/Intro/sections";
import React from "react";

type Props = {
  title: string;
  description: string;
  img: string;
};

function IntroCards({ title, description, img }: Props) {
  return (
    <IntroSection>
      <h1>{title}</h1>
      <div className="description">{description}</div>
      <div className="img">
        <div>
          <img src={img} alt={`${title}`} />
        </div>
      </div>
    </IntroSection>
  );
}

export default IntroCards;
