import { useCallback, useEffect, useState } from "react";
import { getNow } from "./getNow";

export const useNow = () => {
  const [now, setNow] = useState(() => getNow());

  const syncNow = useCallback(() => {
    setNow(getNow());
  }, []);

  useEffect(() => {
    const remainingSecondsToNextMinute = 61 - getNow().getSeconds();

    let timeoutId: NodeJS.Timeout | null = null;
    let intervalId: NodeJS.Timeout | null = null;

    timeoutId = setTimeout(() => {
      syncNow();

      intervalId = setInterval(() => {
        syncNow();
      }, 60 * 1000);
    }, remainingSecondsToNextMinute * 1000);

    return () => {
      timeoutId && clearTimeout(timeoutId);
      intervalId && clearInterval(intervalId);
    };
  }, [syncNow]);

  return now;
};
