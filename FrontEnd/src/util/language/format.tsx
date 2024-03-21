// 뉴스 split하여 배열로 변환
export const newsSplitter = (line: string) => {
  const splittedNews = line
    .split(/\n/g)
    .map((each) => {
      return each.split(/\t/g);
    })
    .reduce(
      (news: string[][][], now: string[]) => {
        if (now[0] == "EOS" || now[0] == "") return news;
        const arr = news;
        arr[arr.length - 1].push(now);
        if (now[0] == "。") arr.push([]);
        return arr;
      },
      [[]]
    );
  return splittedNews;
};

// 배열을 넣으면 문장으로 변환
export const sentenceMaker = (line: string[][]) => {
  const sentence = line.reduce((sen, now) => {
    if (now[0] == "EOS") return sen;
    const add = sen + now[0];
    return add;
  }, "");

  return sentence;
};
