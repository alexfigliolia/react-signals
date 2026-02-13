export interface RawSignal<T> {
  get: () => T;
  listen: (fn: () => T) => () => void;
}
