import {
  chatReportResponseInterface,
  Report,
} from "@/interface/AiChatReportInterface";
import { customAxios } from "@/util/auth/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// 레포트 디테일 조회 하는 함수
export const useGetReport = (reportId?: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["getArticle", reportId],
    queryFn: () => customAxios.get(`/report/detail/get/${reportId}`),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        queryClient.invalidateQueries({
          queryKey: ["getAllReport"],
        });
        queryClient.invalidateQueries({
          queryKey: ["userAchievement"],
        });
        queryClient.invalidateQueries({
          queryKey: ["userAttendance"],
        });
        return data.dataBody as chatReportResponseInterface;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// 레포트 전체 조회 하는 함수
export const useGetAllReport = () => {
  return useQuery<Report[]>({
    queryKey: ["getAllReport"],
    queryFn: async () => {
      const { data } = await customAxios.get(`/report/get`);
      if (data.dataHeader.successCode === 0) {
        return data.dataBody as Report[];
      }
      return [];
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
