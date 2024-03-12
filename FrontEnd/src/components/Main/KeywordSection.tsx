import React from "react";
import UserKeywordChart from "./UserKeywordChart";
import { Card } from "@/styles/common/ui/card";

type Props = {};

function KeywordSection({}: Props) {
  return (
    <div style={{ display: "flex", margin: "3vw" }}>
      <UserKeywordChart />
      <Card>sdfsdfsdfsdfasdklasjdkljdkalsjsdkfjksdlfjlskd</Card>
    </div>
  );
}

export default KeywordSection;
