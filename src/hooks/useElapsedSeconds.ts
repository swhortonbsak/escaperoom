import { useEffect, useState } from 'react';

/** Live elapsed seconds between start and optional end timestamps. */
export function useElapsedSeconds(
  startedAt: number | null | undefined,
  endedAt?: number | null,
): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!startedAt || endedAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [startedAt, endedAt]);

  if (!startedAt) return 0;
  const end = endedAt ?? now;
  return Math.max(0, Math.floor((end - startedAt) / 1000));
}
