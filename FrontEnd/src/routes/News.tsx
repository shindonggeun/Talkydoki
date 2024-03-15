// import { useGetNewsList } from "@/api/newsApi";
import { Wrapper } from "@/styles/common/ui/container";
import { useGetNewsList } from "@/api/newsApi";
import { useState } from "react";

type Props = {};

function News({}: Props) {
  const [cat, setCat] = useState<string>("");
  const [num, setNum] = useState(0);
  const { data, isLoading, refetch } = useGetNewsList(cat, num);

  if (isLoading) return <></>;

  return (
    <Wrapper>
      <select
        value={cat}
        onChange={(e) => {
          setCat(e.target.value);
          setNum((prev) => (prev += 1));
        }}
      >
        <option value="">전체</option>
        <option value="POLITICS">SO</option>
        <option value="SPORTS">SP</option>
      </select>
      <button onClick={() => refetch()}>ㅇㅇㅇㅇㅇ</button>
      {data &&
        data.dataBody.content.map((each, idx) => (
          <div key={idx}>{each.title}</div>
        ))}
    </Wrapper>
  );
}

export default News;
