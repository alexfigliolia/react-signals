import { describe, test, expect, vi } from "vitest";
import { act } from "react";
import { renderHook } from "@testing-library/react";
import { signal } from "@figliolia/signals";

import { useSignalEffect } from "../useSignalEffect";
import { useSignalBinding } from "../useSignalBinding";
import { useSignal } from "../useSignal";
import { useComputed } from "../useComputed";

describe("React Bindings", () => {
  test("useSignal", () => {
    const { result } = renderHook(() => useSignal(1));
    const signal = result.current[1];
    expect(result.current[0]).toEqual(1);
    act(() => {
      result.current[1].update(v => v + 1);
    });
    expect(result.current[0]).toEqual(2);
    act(() => {
      result.current[1].update(v => v + 1);
    });
    expect(result.current[0]).toEqual(3);
    // expect first instance to persist
    expect(signal).toEqual(result.current[1]);
  });

  test("useComputed", () => {
    const signal1 = signal(1);
    const signal2 = signal(1);
    const signal3 = signal(1);
    const { result } = renderHook(() =>
      useComputed(() => signal1() + signal2() + signal3()),
    );
    const instance = result.current[1];
    expect(result.current[0]).toEqual(3);
    act(() => {
      signal1.update(v => v + 1);
    });
    expect(result.current[0]).toEqual(4);
    act(() => {
      signal2.update(v => v + 1);
    });
    expect(result.current[0]).toEqual(5);
    act(() => {
      signal3.update(v => v + 1);
    });
    expect(result.current[0]).toEqual(6);
    // expect first instance to persist
    expect(instance).toEqual(result.current[1]);
  });

  test("useSignalEffect", () => {
    const signal1 = signal(1);
    const signal2 = signal(1);
    const signal3 = signal(1);
    const fn = vi.fn();
    const { result } = renderHook(() =>
      useSignalEffect(() => fn(signal1() + signal2() + signal3())),
    );
    expect(fn).toHaveBeenCalledWith(3);
    act(() => {
      signal1.update(v => v + 1);
    });
    expect(fn).toHaveBeenCalledWith(4);
    act(() => {
      signal2.update(v => v + 1);
    });
    expect(fn).toHaveBeenCalledWith(5);
    act(() => {
      signal3.update(v => v + 1);
    });
    expect(fn).toHaveBeenCalledWith(6);
    // destroy
    result.current();
    act(() => {
      signal3.update(v => v + 1);
    });
    expect(fn).not.toHaveBeenCalledWith(7);
  });

  test("useSignalBinding", () => {
    const testSignal = signal(1);
    const { result } = renderHook(() => useSignalBinding(testSignal));
    const instance = result.current[1];
    expect(result.current[0]).toEqual(1);
    act(() => {
      result.current[1].update(v => v + 1);
    });
    expect(result.current[0]).toEqual(2);
    act(() => {
      result.current[1].update(v => v + 1);
    });
    expect(result.current[0]).toEqual(3);
    // expect first instance to persist
    expect(instance).toEqual(result.current[1]);
  });
});
