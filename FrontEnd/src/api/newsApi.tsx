import {
  NewsListItemInterface,
  categoryInterface,
  newsInterface,
  shadowingParams,
  splittedNewsInterface,
} from "@/interface/NewsInterface";
import { useIsSearchOn } from "@/stores/newsStore";
import { customAxios } from "@/util/auth/customAxios";
import {
  newsSplitter,
  sentenceMaker,
  transSplitter,
} from "@/util/language/format";
import { KanaToHira } from "@/util/language/japanese";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import DefaultImg from "@/assets/images/default_news_image.jpeg";

// 뉴스 리스트 get 하는 함수
export const useGetNewsList = (category: categoryInterface[]) => {
  const catKeys: { [name: string]: boolean } = {};

  const params = new URLSearchParams();
  category.forEach((each) => {
    params.append("categories", each.name);
    catKeys[each.name] = true;
  });

  return useInfiniteQuery({
    queryKey: ["getNewsList", catKeys],
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

// 단일 뉴스 조회
export const useGetArticle = (newsId: number) => {
  return useQuery({
    queryKey: ["getArticle", newsId],
    queryFn: () => customAxios.get(`/news/get/${newsId}`),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        const news = data.dataBody as newsInterface;
        const newsContent = newsSplitter(news.content);
        const keywords: { [keyword: string]: { count: number; read: string } } =
          {};

        // 키워드 발음 추출
        news.newsKeywords.forEach((each, idx) => {
          if (idx > 4) return;
          let read: string;

          if (/[一-龠]/.test(each.charAt(0))) {
            read = newsContent
              .map((e) => e.filter((word) => word[0] == each))
              .filter((e) => e.length > 0)[0][0][1];
          } else {
            read = each;
          }

          const regex = new RegExp(`${each}`, "g");
          keywords[each] = {
            count: news.content.match(regex)?.length || 0,
            read: KanaToHira(read),
          };
        });

        // 뉴스 변환
        const newNews = {
          newsId: news.newsId,
          title: newsSplitter(news.title)[0],
          titleTranslated: transSplitter(news.titleTranslated)[0],
          category: news.category,
          content: newsContent,
          contentTranslated: transSplitter(news.contentTranslated),
          summary: newsSplitter(news.summary),
          summaryTranslated: transSplitter(news.summaryTranslated),
          writeDate: news.writeDate,
          srcOrigin: news.srcOrigin,
          newsImages:
            news.newsImages.length > 0 ? news.newsImages : [DefaultImg],
          newsKeywords: keywords,
          fullTitle: sentenceMaker(newsSplitter(news.title)[0]),
          fullNews: newsSplitter(news.content).map((each) =>
            sentenceMaker(each)
          ),
        };
        return newNews as splittedNewsInterface;
      }
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// 단어 검색 API
export const useSearchWordApi = (word: string) => {
  const isSearchOn = useIsSearchOn();

  return useQuery({
    queryKey: ["serchWord", word],
    queryFn: () => customAxios.get(`/vocabulary/search/${word}`),
    select: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        return data.dataBody;
      } else {
        return "nodata";
      }
    },
    enabled: isSearchOn,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// 메인화면 뉴스 추천
export const useRecommendNews = () => {
  return useQuery({
    queryKey: ["recommandNews"],
    queryFn: () => customAxios.get("news/recommend"),
    select: ({ data }) => {
      return data.recommendations as newsInterface[];
    },
    staleTime: 1000 * 60 * 60, // 1시간
    gcTime: 1000 * 60 * 60, // 1시간
  });
};

export const useSendSpeech = (newsId: number, idx: number) => {
  const querytClient = useQueryClient();

  return useMutation({
    mutationFn: ({ newsId, original, userText }: shadowingParams) => {
      return customAxios.post(`news/shadowing/${newsId}`, {
        original,
        userText,
      });
    },
    onSuccess: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        querytClient.setQueryData(
          ["shadowEvaluation", newsId, idx],
          data.dataBody.similarity as number
        );
      }
      return data;
    },
  });
};
