import { useCallback, useMemo, useSyncExternalStore } from "react";

import type { RawSignal } from "./types";

export function useSignalBinding<T extends RawSignal<any>>(
  signal: T,
): [ReturnType<T["get"]>, T] {
  const get = useCallback(() => signal.get(), [signal]);
  const subscribe = useCallback(
    (fn: () => void) => signal.listen(fn),
    [signal],
  );
  const current = useSyncExternalStore(subscribe, get);
  return useMemo(() => [current, signal] as const, [current, signal]);
}
