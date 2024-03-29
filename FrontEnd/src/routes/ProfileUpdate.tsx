import { Wrapper } from "@/styles/common/ui/container";
import UpdateProfileSection from "@/components/MyPage/ProfileUpdate/UpdateProfileSection";
import UpdatePasswordSection from "@/components/MyPage/ProfileUpdate/UpdatePasswordSection";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { UpdateWrapper } from "@/styles/ProfileUpdate/UpdateForm";
import { useState } from "react";
import { useTheme } from "styled-components";
import { useGetMember } from "@/api/memberApi";

type Props = {};

function ProfileUpdate({}: Props) {
  const [now, setNow] = useState(0);
  const theme = useTheme();
  const { data } = useGetMember();

  return (
    <Wrapper>
      <UpdateWrapper>
        <Tabs
          value={now}
          onChange={(_e, nV) => setNow(nV)}
          textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.main.color,
            },
          }}
        >
          <Tab label="프로필 수정" />
          <Tab label="회원 수정" />
        </Tabs>

        {data && <UpdateProfileSection value={now} index={0} user={data} />}
        {data && (
          <UpdatePasswordSection
            value={now}
            index={1}
            provider={data.provider}
          />
        )}
      </UpdateWrapper>
    </Wrapper>
  );
}

export default ProfileUpdate;
