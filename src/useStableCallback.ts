import { useCallback, useEffect, useRef } from "react";

export const useStableCallback = <T>(fn: () => T) => {
  const stablized = useRef(fn);

  useEffect(() => {
    stablized.current = fn;
  }, [fn]);

  return useCallback(() => stablized.current(), []);
};
