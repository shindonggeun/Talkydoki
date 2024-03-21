import { useFinishSocialLogin } from "@/api/memberApi";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

type Props = {};
function SocialLoading({}: Props) {
  const location = useLocation();
  const { provider } = useParams();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code") || "";

  const { mutate: finishSocial } = useFinishSocialLogin();

  useEffect(() => {
    if (provider && code) {
      finishSocial({ provider, code });
    }
  }, [provider, code, finishSocial]);
  return <></>;
}

export default SocialLoading;
