import {
  NewsListItemInterface,
  categoryInterface,
} from "@/interface/NewsInterface";
import { customAxios } from "@/util/auth/customAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

// 뉴스 리스트 get 하는 함수
export const useGetNewsList = (category: categoryInterface[]) => {
  const catName = category.map((each) => each.name);
  const params = new URLSearchParams();
  category.forEach((each) => {
    params.append("categories", each.name);
  });

  return useInfiniteQuery({
    queryKey: ["getNewsList", ...catName],
    queryFn: ({ pageParam }) => {
      console.log("getNewsList 실행");
      if (pageParam != 0) params.append("lastNewsId", pageParam.toString());

      return customAxios
        .get("/news/list/get", {
          params: params,
        })
        .then((res) => {
          if (res.data.dataHeader.successCode == 0) {
            return res.data.dataBody;
          } else {
            return null;
          }
        });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        const { contents } = lastPage;
        const lastId = contents[contents.length - 1].newsId;
        return lastId;
      } else {
        return undefined;
      }
    },
    select: ({ pages }) => {
      const newsList: NewsListItemInterface[] = pages.reduce((arr, now) => {
        arr = arr.concat(now.contents);
        return arr;
      }, []);

      return newsList;
    },
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60, // 1시간
  });
};
