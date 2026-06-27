"use client";

import { useGameStore } from "@/store/gameStore";
import { HelpButton } from "./HelpButton";

export function HelpBar() {
  const answered = useGameStore((s) => s.answered);
  const helps = useGameStore((s) =>
    s.mode === "versus" ? s.teams[s.currentTeam].helps : s.helps,
  );
  const eliminatedOptions = useGameStore((s) => s.eliminatedOptions);
  const useEliminate = useGameStore((s) => s.useEliminate);
  const usePastor = useGameStore((s) => s.usePastor);
  const useSkip = useGameStore((s) => s.useSkip);

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      <HelpButton
        icon="✂️"
        label="Eliminar 2"
        remaining={helps.eliminate}
        disabled={answered || helps.eliminate <= 0 || eliminatedOptions.length > 0}
        onClick={useEliminate}
      />
      <HelpButton
        icon="🙏"
        label="Pastor"
        remaining={helps.pastor}
        disabled={answered || helps.pastor <= 0}
        onClick={usePastor}
      />
      <HelpButton
        icon="⏭️"
        label="Pular"
        remaining={helps.skip}
        disabled={helps.skip <= 0}
        onClick={useSkip}
      />
    </div>
  );
}
