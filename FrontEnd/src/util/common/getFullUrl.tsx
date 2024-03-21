import defaultImage from "@/assets/images/default_profile.png";

export const getProfileImage = (url: string | null) => {
  return url ? `${url}` : defaultImage;
};
