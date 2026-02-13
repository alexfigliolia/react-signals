# React Signals

React bindings for [Signals](https://www.npmjs.com/package/@figliolia/signals).

This library provides a lightweight react-compatible wrapper around the [Signals API](https://www.npmjs.com/package/@figliolia/signals)

## Installation

```bash
npm i @figliolia/signals @figliolia/react-signals
```

## API

### useSignal

Returns a reactive value and a `Signal` instance

```tsx
import { useSignal } from "@figliolia/react-signals";

const MyCounter = () => {
  const [value, signal] = useSignal(4);

  const increment = () => {
    signal.update(currentValue => currentValue + 1);
  };

  const decrement = () => {
    signal.update(currentValue => currentValue - 1);
  };

  return (
    <div>
      <h1>Basic Counter</h1>
      <div>{value}</div>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
```

### useComputed

Returns a reactive value and a `Computed` instance

```tsx
import type { Signal } from "@figliolia/signals";
import { useComputed } from "@figliolia/react-signals";

export const MyComputedValue = ({ signals }: { signals: Signal<number>[] }) => {
  const [current, computed] = useComputed(() => {
    return signals.reduce((acc, next) => {
      acc += next.get();
      return acc;
    }, 0);
  });

  return <div>{current}</div>;
};
```

### useSignalEffect

Runs a callback everytime a dependency signal changes

```tsx
import { useSignalEffect, useSignal } from "@figliolia/react-signals";

const useSignalChanged = <T>(initialValue: T) => {
  const [, signal] = useSignal(initialValue);
  const destroy = useSignalEffect(() => {
    // react to your signal updating
    console.log(signal());
  });
  return signal;
};
```

Calling `destroy()` will unregister your signal effect. This method will be called for you when the hook unmounts.

### useSignalBinding

Allows signals declared externally from React components to become reactive state for a component

```typescript
import { signal } from "@figliolia/signals";
import { useBoundSignal } from "@figliolia/signals-react";

const externalSignal = signal(1);

const MyComponent = () => {
  const currentValue = useBoundSignal(externalSignal);
  // Rerenders on changes to externalSignal
};
```
