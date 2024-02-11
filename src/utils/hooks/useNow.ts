import { useLayoutEffect, useState } from "react";

export const useNow = (updateInterval: number, enabled: number | null) => {
  const [now, setNow] = useState(Date.now());

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }

    setNow(Date.now());

    const interval = setInterval(() => {
      setNow(Date.now());
    }, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, [updateInterval, enabled]);
  return now;
};
