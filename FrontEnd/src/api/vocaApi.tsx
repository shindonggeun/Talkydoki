import {
  PersonalVocaInterface,
  VocaInterface,
} from "@/interface/VocaInterface";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { customAxios } from "@/util/auth/customAxios";
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

// 랜덤단어
export const useGetVoca = () => {
  return useQuery({
    queryKey: ["getVoca"],
    queryFn: () => {
      console.log("getVoca 실행");
      return customAxios.get("/vocabulary/daily/get");
    },
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

// 단어장에 추가
export const useAddVoca = (querykey: string, word: string) => {
  const setIsModalOn = useSetISModalOn();
  const setModalContent = useSetModalContent();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addVoca"],
    mutationFn: (vocabularyId: number) =>
      customAxios.post(`/vocabulary/personal/create/${vocabularyId}`),
    onSuccess: ({ data }) => {
      const { dataHeader } = data;
      if (dataHeader.successCode == 0) {
        queryClient.invalidateQueries({ queryKey: ["getVocaList"] });
        if (querykey == "getVoca") {
          queryClient.setQueryData(["getVoca"], (prev: AxiosResponse) => {
            prev.data.dataBody.personalVocabularyId =
              data.dataBody.personalVocabularyId;
            return prev;
          });
        } else if (querykey == "searchWord") {
          queryClient.setQueryData(
            ["searchWord", word],
            (prev: AxiosResponse) => {
              prev.data.dataBody.personalVocabularyId =
                data.dataBody.personalVocabularyId;
              return prev;
            }
          );
        }
      } else {
        setModalContent({
          message: dataHeader.resultMessage,
          isInfo: true,
        });
        setIsModalOn(true);
      }
    },
  });
};

// 단어장 목록 표시
export const useMyVoca = () => {
  return useInfiniteQuery({
    queryKey: ["getVocaList"],
    queryFn: ({ pageParam }) => {
      console.log("getVocaList 실행");
      return customAxios
        .get("/vocabulary/personal/list/get", {
          params: {
            page: pageParam,
            size: 10,
          },
        })
        .then((res) => res.data.dataBody);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.hasNext) {
        return pages.length;
      } else {
        return undefined;
      }
    },
    select: ({ pages }) => {
      const words: PersonalVocaInterface[] = pages.reduce((arr, now) => {
        arr = arr.concat(now.contents);
        return arr;
      }, []);

      return words;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// 단어 삭제
export const useDeleteMyVoca = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => {
      return customAxios.delete(`/vocabulary/personal/delete/${id}`);
    },
    onMutate: (vocaId: number) => {
      queryClient.cancelQueries({ queryKey: ["getVocaList"] });

      // 이전 데이터 백업
      const previousWords = queryClient.getQueryData(["getVocaList"]);
      if (previousWords === undefined) return;
      // 낙관적 업데이트
      queryClient.setQueryData(
        ["getVocaList"],
        (
          old: InfiniteData<{
            contents: PersonalVocaInterface[];
            hasNext: boolean;
          }>
        ) => {
          old.pages = old.pages.map((page) => {
            return {
              contents: page.contents.filter(
                (each) => each.personalVocabularyId != vocaId
              ),
              hasNext: page.hasNext,
            };
          });
          return old;
        }
      );

      return { previousWords };
    },
    onSuccess: ({ data }) => {
      if (data.dataHeader.successCode == 0) {
        queryClient.invalidateQueries({ queryKey: ["getVocaList"] });
      }
    },
    onError: (_err, _id, context) => {
      if (context?.previousWords) {
        queryClient.setQueryData(["getVocaList"], context.previousWords);
      }
    },
  });
};
