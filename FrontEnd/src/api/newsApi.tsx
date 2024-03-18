import { customAxios } from "@/util/auth/customAxios";
import { useQuery } from "@tanstack/react-query";

export const useGetNewsList = (category?: string) => {
  return useQuery({
    queryKey: ["getNewsList"],
    queryFn: () =>
      customAxios.get("/news/get", {
        params: {
          category: category,
          page: 0,
          size: 2,
        },
      }),
    select: (res) => {
      console.log(res);
      return res;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
