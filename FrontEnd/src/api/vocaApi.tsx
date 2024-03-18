import {
  PersonalVocaInterface,
  VocaInterface,
} from "@/interface/VocaInterface";
import { useSetISModalOn, useSetModalContent } from "@/stores/modalStore";
import { customAxios } from "@/util/auth/customAxios";
import {
  InfiniteData,
  InvalidateQueryFilters,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// 랜덤단어
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

// 단어장에 추가
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

export const useMyVoca = () => {
  return useInfiniteQuery({
    queryKey: ["getVocaList"],
    queryFn: ({ pageParam }) => {
      console.log("단어불러오기");
      return customAxios
        .get("/vocabulary/personal/list/get", {
          params: {
            page: pageParam,
            size: 5,
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
    onSuccess: (res) => console.log(res),
    onError: (err, id, context) => {
      queryClient.setQueryData(["getVocaList"], context?.previousWords);
    },
  });
};
