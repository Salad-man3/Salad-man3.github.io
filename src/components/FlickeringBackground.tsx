import { FlickeringGrid } from "@/components/ui/flickering-grid";

const CYAN = "#7dd3fc";
const GOLD = "#e9b824";
const VIOLET = "#c4b5fd";
const GREEN = "#4ade80";

export function FlickeringBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden" aria-hidden>
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color={CYAN}
        maxOpacity={0.4}
        flickerChance={0.18}
      />
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={3}
        gridGap={18}
        color={GOLD}
        maxOpacity={0.28}
        flickerChance={0.08}
      />
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={5}
        gridGap={22}
        color={VIOLET}
        maxOpacity={0.18}
        flickerChance={0.06}
      />
      <FlickeringGrid
        className="absolute inset-0 size-full"
        squareSize={4}
        gridGap={16}
        color={GREEN}
        maxOpacity={0.26}
        flickerChance={0.1}
      />
    </div>
  );
}
