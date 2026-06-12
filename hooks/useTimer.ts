"use client";

import { useEffect, useRef, useState } from "react";

interface UseTimerOptions {
  seconds: number;
  enabled: boolean;
  /** Reinicia a contagem sempre que esta chave muda (ex.: num da pergunta). */
  resetKey: unknown;
  paused?: boolean;
  onExpire?: () => void;
}

/**
 * Cronômetro regressivo por pergunta. Mantém o tick em estado local
 * (não polui o store). Dispara onExpire uma única vez ao chegar a zero.
 */
export function useTimer({
  seconds,
  enabled,
  resetKey,
  paused = false,
  onExpire,
}: UseTimerOptions) {
  const [remaining, setRemaining] = useState(seconds);
  const expiredRef = useRef(false);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  // Reinicia ao trocar de pergunta
  useEffect(() => {
    setRemaining(seconds);
    expiredRef.current = false;
  }, [resetKey, seconds]);

  useEffect(() => {
    if (!enabled || paused) return;
    if (remaining <= 0) return;

    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1;
        if (next <= 0 && !expiredRef.current) {
          expiredRef.current = true;
          onExpireRef.current?.();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [enabled, paused, remaining]);

  return { remaining };
}
