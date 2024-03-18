import { customAxios } from "@/util/auth/customAxios";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetNewsList = (category: string, page: number) => {
  const cat = category == "" ? null : category;
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["getNewsList", cat != null ? cat : "all"],
    queryFn: () => {
      console.log("실행한당");
      return customAxios.get("/news/get", {
        params: {
          category: cat,
          page: page,
          size: 2,
        },
      });
    },
    initialData: queryClient.getQueryData(["getNewsList", cat]),
    placeholderData: keepPreviousData,
    select: ({ data }) => data,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// export const useGetNewsList = (category?: string) => {
//   return useQuery({
//     queryKey: ["getNewsList"],
//     queryFn: () =>
//       customAxios.get("/news/get", {
//         params: {
//           category: category,
//           page: 0,
//           size: 2,
//         },
//       }),
//     select: (res) => {
//       console.log(res);
//       return res;
//     },
//     staleTime: Infinity,
//     gcTime: Infinity,
//   });
// };
