import { useRef } from "react";
import { signal } from "@figliolia/signals";

import { useSignalBinding } from "./useSignalBinding";

export const useSignal = <T>(value: T) => {
  const ref = useRef(signal(value));
  return useSignalBinding(ref.current);
};
