import { Cookies } from "react-cookie";

export const getCookie = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  return accessToken;
};
