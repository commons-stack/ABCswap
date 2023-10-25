import { useLayoutEffect, useState } from "react";

// Modified from https://usehooks-ts.com/react-hook/use-debounce/
export default function useDebounce<T>(value: T, delay?: number): [T, boolean] {
  const [isDebouncing, setIsDebouncing] = useState(true);
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useLayoutEffect(() => {
    // Set isDebouncing to true whenever value changes
    setIsDebouncing(true);

    const timer = setTimeout(() => {
        setDebouncedValue(value);
        setIsDebouncing(false);
    }, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return [debouncedValue, isDebouncing]
}
