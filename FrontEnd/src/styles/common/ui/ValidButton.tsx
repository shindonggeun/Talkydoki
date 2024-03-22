import { SignupParams } from "@/interface/AuthInterface";
import { Button } from "@mui/material";
import React from "react";

type Props = {
  validator: (
    params: SignupParams,
    param2: React.MutableRefObject<string>
  ) => boolean;
  params: SignupParams;
  param2: React.MutableRefObject<string>;
};

function ValidButton({ validator, params, param2 }: Props) {
  return (
    <Button
      type="submit"
      variant="contained"
      color="purple"
      fullWidth
      disabled={!validator(params, param2)}
    >
      회원가입
    </Button>
  );
}

export default ValidButton;
