// DB에서 단어장 호출 시 한글 뜻이 "1.뜻1 2.뜻2" 형식일 경우 배열로 변환하는 함수

export const splitMeaning = (meaning: string) => {
  if (meaning.charAt(0) != "1") return [meaning];
  const newArr = [];
  let st = 0;
  let ed = 1;

  for (let i = 1; i < meaning.length; i++) {
    const word = meaning.charAt(i);

    if ("123456789".split("").indexOf(word) > -1) {
      newArr.push(meaning.slice(st, ed));
      st = ed;
    } else {
      ed += 1;
    }
  }

  return newArr;
};
