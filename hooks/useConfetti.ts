"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

const GOLD = ["#FFD56A", "#F5B642", "#C8932B", "#FFE9A8"];
const ROYAL = ["#A855F7", "#6D28D9", "#4C1D95"];

export function useConfetti() {
  const burst = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: [...GOLD, ...ROYAL],
      scalar: 1.1,
    });
  }, []);

  const celebrate = useCallback(() => {
    const end = Date.now() + 1200;
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: GOLD,
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ROYAL,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return { burst, celebrate };
}
