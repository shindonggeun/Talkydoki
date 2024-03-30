import {
  PasswordChangeParams,
  ProfileUpdateParams,
} from "@/interface/AuthInterface";
import {
  UserAchievementInterface,
  UserKeywordInterface,
} from "@/interface/UserInterface";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { useSetPasswordErrors } from "@/stores/signUpStore";
import { customAxios } from "@/util/auth/customAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();

  return useMutation({
    mutationFn: (payload: ProfileUpdateParams) => {
      return customAxios.patch("/member/update", payload, {});
    },
    onMutate: async (payload) => {
      // 낙관적 업데이트
      await queryClient.cancelQueries({ queryKey: ["getMember"] });
      const previousData = queryClient.getQueryData(["getMember"]);

      const newProfImg = payload.profileImage;
      const newNickname = payload.nickname;

      const updatedProfile = JSON.parse(JSON.stringify(previousData));

      if (newProfImg) updatedProfile.dataBody.nickname = newNickname;
      if (newNickname) updatedProfile.dataBody.profileImage = newProfImg;

      queryClient.setQueryData(["getMember"], updatedProfile);

      return { previousData };
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["getMember"] });
    // },
    onSuccess: ({ data }, _params, context) => {
      if (data.dataHeader.successCode == 0) {
        setModalContent({
          message: "프로필이 저장되었습니다.",
          isInfo: true,
          isReadOnly: true,
        });
        navigate(-1);
        setTimeout(() => {
          setIsModalOn(false);
        }, 100);
        return;
      } else {
        queryClient.setQueryData(["getMember"], context.previousData);
        setIsModalOn(false);
      }
    },
    onError: (_err, _newData, context) => {
      console.log(context?.previousData);
      queryClient.setQueryData(["getMember"], context?.previousData);
      navigate(-1);
      setIsModalOn(false);
    },
  });
};

// 비밀번호 변경 mutation
export const usePasswordChange = () => {
  const setPasswordErrors = useSetPasswordErrors();
  const setModalContent = useSetModalContent();
  const setIsModalOn = useSetISModalOn();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: PasswordChangeParams) =>
      customAxios.patch("member/password/change", payload),

    onSuccess: ({ data }) => {
      const { dataHeader } = data;

      // 성공 시
      if (dataHeader.successCode == 0) {
        setModalContent({
          message: "변경이 완료되었습니다.",
          isInfo: true,
        });
        setIsModalOn(true);
        navigate("/mypage");

        // 실패 시
      } else if (dataHeader.successCode == 1) {
        // result Code가 없을 경우 모달 출력
        if (!dataHeader.resultCode) {
          setModalContent({
            message: dataHeader.resultMessage,
            isInfo: true,
          });
          setIsModalOn(true);
        } else {
          // 있을 경우 (validError)
          setPasswordErrors({ ...dataHeader.resultMessage });
        }
      }
    },
  });
};

// 사용자 키워드 불러오는 hook
export const useUserKeyword = () => {
  return useQuery({
    queryKey: ["userKeywords"],
    queryFn: () => customAxios.get("/keywords/member"),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        return data.dataBody as UserKeywordInterface[];
      } else {
        return [] as UserKeywordInterface[];
      }
    },
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60, // 1시간
  });
};

export const useGetUserAchievement = () => {
  return useQuery({
    queryKey: ["userAchievement"],
    queryFn: () => customAxios.get("/member/mypage"),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        return data.dataBody as UserAchievementInterface;
      }
    },
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60, // 1시간
  });
};
