import { useCallback, useEffect, useRef } from "react";
import { effect } from "@figliolia/signals";

import { useStableCallback } from "./useStableCallback";

export const useSignalEffect = (fn: () => void) => {
  const callback = useStableCallback(fn);
  const destroy = useRef(effect(callback));

  useEffect(() => {
    return () => {
      destroy.current();
    };
  }, []);

  return useCallback(() => destroy.current(), []);
};
