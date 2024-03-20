import {
  NewsListInterface,
  NewsListItemInterface,
} from "@/interface/NewsInterface";
import { customAxios } from "@/util/auth/customAxios";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetNewsList = () => {
  return useInfiniteQuery({
    queryKey: ["getNewsList"],
    queryFn: ({ pageParam }) => {
      console.log("getNewsList 실행");
      return customAxios
        .get("/news/list/get", {
          params: {
            categories: null,
            lastNewsId: pageParam == 0 ? null : pageParam,
            // limit: 6,
          },
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
  });
};
