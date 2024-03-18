import defaultImage from "@/assets/images/default_profile.png";

const { VITE_REACT_API_URL } = import.meta.env;

export const getProfileImage = (url: string | null) => {
  return url ? `${VITE_REACT_API_URL}${url}` : defaultImage;
};
