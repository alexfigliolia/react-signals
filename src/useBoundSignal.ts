import { useSignalBinding } from "./useSignalBinding";
import type { RawSignal } from "./types";

export const useBoundSignal = <T extends RawSignal<any>>(signal: T) => {
  return useSignalBinding(signal)[0];
};
