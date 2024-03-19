import { ProfileUpdateParams } from "@/interface/AuthInterface";
import { customAxios } from "@/util/auth/customAxios";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// 이미지 업로드
export const useUploadImageFile = () => {
  return useMutation({
    mutationFn: (payload: FormData) =>
      customAxios.post("/firebase/upload", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),

    onSuccess: () => console.log("이미지 업로드 완료"),
  });
};

// 프로필 업데이트
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ProfileUpdateParams) =>
      customAxios.patch("/member/update", payload, {}),
    onSuccess: () => {
      queryClient.invalidateQueries(["getMember"] as InvalidateQueryFilters);
      navigate("/mypage");
    },
  });
};
