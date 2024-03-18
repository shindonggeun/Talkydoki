// DB에서 단어장 호출 시 한글 뜻이 "1.뜻1 2.뜻2" 형식일 경우 배열로 변환하는 함수

export const splitMeaning = (meaning: string) => {
  if (meaning.charAt(0) != "1") return [meaning];
  const newArr: string[] = [];

  meaning.split(/[0-9]/).forEach((each, idx) => {
    if (idx > 0) {
      newArr.push(idx.toString() + each);
    }
  });

  return newArr;
};
