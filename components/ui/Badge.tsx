import type { Difficulty } from "@/types";
import { DIFFICULTY_META } from "@/lib/constants";

const styles: Record<Difficulty, string> = {
  easy: "bg-success/20 text-success border-success/40",
  medium: "bg-gold/20 text-gold-light border-gold/40",
  hard: "bg-danger/20 text-danger border-danger/40",
};

export function Badge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`inline-block rounded-full border px-4 py-1 text-xs md:text-sm font-bold uppercase tracking-[0.2em] ${styles[difficulty]}`}
    >
      {DIFFICULTY_META[difficulty].short}
    </span>
  );
}
