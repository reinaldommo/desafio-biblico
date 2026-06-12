"use client";

interface StatsBarProps {
  easyRemaining: number;
  hardRemaining: number;
}

export function StatsBar({ easyRemaining, hardRemaining }: StatsBarProps) {
  return (
    <div className="flex items-stretch gap-3">
      <div className="glass flex-1 rounded-2xl px-4 py-3 text-center">
        <div className="font-numeric text-2xl font-bold text-success">
          {easyRemaining}
        </div>
        <div className="text-[0.7rem] uppercase tracking-wider text-ink-soft">
          Fáceis / Médias
        </div>
      </div>
      <div className="glass flex-1 rounded-2xl px-4 py-3 text-center">
        <div className="font-numeric text-2xl font-bold text-danger">
          {hardRemaining}
        </div>
        <div className="text-[0.7rem] uppercase tracking-wider text-ink-soft">
          Difíceis restantes
        </div>
      </div>
    </div>
  );
}
