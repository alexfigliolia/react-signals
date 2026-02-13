import { useRef } from "react";
import { computed, type Computer } from "@figliolia/signals";

import { useStableCallback } from "./useStableCallback";
import { useSignalBinding } from "./useSignalBinding";

export const useComputed = <T>(computer: Computer<T>) => {
  const invoker = useStableCallback(computer);
  const ref = useRef(computed(invoker));
  return useSignalBinding(ref.current);
};
