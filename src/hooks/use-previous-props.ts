import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function usePreviousProps<K = any>(value: K) {
  const ref = useRef<K | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
