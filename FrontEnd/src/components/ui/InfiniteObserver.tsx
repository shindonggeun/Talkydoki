import { ObserverWrapper } from "@/styles/common/ui/container";
import { useEffect, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  observerCallback: IntersectionObserverCallback;
  isFetching: boolean;
  isLoading: boolean;
};

function InfiniteObserver({ observerCallback, isFetching, isLoading }: Props) {
  const observerRef = useRef<HTMLDivElement>(null);

  const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.3,
  });

  useEffect(() => {
    if (!observerRef.current) return;
    observer.observe(observerRef.current);

    return () => {
      if (!observerRef.current) return;
      return observer.unobserve(observerRef.current);
    };
  }, []);

  return (
    <ObserverWrapper ref={observerRef}>
      {isFetching || isLoading ? <CircularProgress color="purple" /> : null}
    </ObserverWrapper>
  );
}

export default InfiniteObserver;
