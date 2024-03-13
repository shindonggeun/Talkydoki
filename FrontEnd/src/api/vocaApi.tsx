import { VocaInterface } from "@/interface/VocaInterface";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { customAxios } from "@/util/auth/customAxios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetVoca = () => {
  return useQuery({
    queryKey: ["getVoca"],
    queryFn: () => customAxios.get("/vocabulary/daily/get"),
    staleTime: Infinity,
    gcTime: Infinity,
    select: ({ data }) => {
      const { dataHeader, dataBody } = data;

      if (dataHeader.successCode == 0) {
        return dataBody as VocaInterface;
      } else {
        alert(dataHeader.resultMessage);
      }
    },
  });
};

export const useAddVoca = () => {
  const setIsModalOn = useSetISModalOn();
  const setModalContent = useSetModalContent();

  return useMutation({
    mutationKey: ["addVoca"],
    mutationFn: (vocabularyId: number) =>
      customAxios.post(`/vocabulary/personal/create/${vocabularyId}`),
    onSuccess: ({ data }) => {
      const { dataHeader } = data;
      if (dataHeader.successCode == 0) {
        return true;
      } else {
        setModalContent({
          message: dataHeader.resultMessage,
          isInfo: true,
        });
        setIsModalOn(true);
        return true;
      }
    },
  });
};
