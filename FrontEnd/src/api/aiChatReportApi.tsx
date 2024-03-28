import { chatReportResponseInterface } from "@/interface/AiChatReportInterface";
import { customAxios } from "@/util/auth/customAxios";
import { useQuery } from "@tanstack/react-query";

// 레포트 디테일 조회 하는 함수
export const useGetReport = (reportId: number) => {
  return useQuery({
    queryKey: ["getArticle", reportId],
    queryFn: () => customAxios.get(`/report/${reportId}`),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        return data.dataBody as chatReportResponseInterface;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
