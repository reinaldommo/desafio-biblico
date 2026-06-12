"use client";

import { useGameStore } from "@/store/gameStore";
import { Modal } from "@/components/ui/Modal";

interface RankingModalProps {
  open: boolean;
  onClose: () => void;
  highlightId?: string | null;
}

const medals = ["🥇", "🥈", "🥉"];

export function RankingModal({ open, onClose, highlightId }: RankingModalProps) {
  const ranking = useGameStore((s) => s.ranking);

  return (
    <Modal open={open} onClose={onClose} title="🏆 Ranking">
      {ranking.length === 0 ? (
        <p className="py-6 text-center text-ink-soft">
          Nenhuma pontuação registrada ainda. Sejam os primeiros!
        </p>
      ) : (
        <ol className="flex flex-col gap-2">
          {ranking.map((entry, i) => (
            <li
              key={entry.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                entry.id === highlightId
                  ? "border-gold bg-gold/15 shadow-gold-glow"
                  : "border-white/10 bg-white/[0.04]"
              }`}
            >
              <span className="w-8 text-center font-display text-lg">
                {medals[i] ?? i + 1}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink">{entry.teamName}</p>
                <p className="text-xs text-ink-soft">
                  {entry.correct} acertos · sequência máx. {entry.maxStreak}
                </p>
              </div>
              <span className="font-numeric text-xl font-bold text-gold-light">
                {entry.score.toLocaleString("pt-BR")}
              </span>
            </li>
          ))}
        </ol>
      )}
      <button
        onClick={onClose}
        className="mt-5 w-full rounded-xl bg-white/[0.06] py-3 text-ink-soft transition-colors hover:bg-white/[0.12]"
      >
        Fechar
      </button>
    </Modal>
  );
}
