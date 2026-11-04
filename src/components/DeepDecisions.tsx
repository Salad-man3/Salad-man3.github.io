"use client"
import * as React from "react";
import type { Decision, Diagram } from "@/data/projects";
import { DecisionCard } from "@/components/DecisionCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DeepDecisions({ diagrams, decisions }: { diagrams: Diagram[]; decisions: Decision[] }) {
  const byId = React.useMemo(() => new Map(diagrams.map((d) => [d.id, d])), [diagrams]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Diagram | null>(null);
  const lastTrigger = React.useRef<HTMLElement | null>(null);

  const openDiagram = React.useCallback(
    (id: string) => {
      const d = byId.get(id);
      if (!d) return;
      setActive(d);
      setOpen(true);
    },
    [byId]
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {decisions.map((d) => (
          <DecisionCard key={d.title} decision={d} onDiagram={openDiagram} />
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[96vh] w-[min(96vw,90rem)] max-w-[min(96vw,90rem)] overflow-auto p-3 sm:max-w-[min(96vw,90rem)] sm:p-6">
          <DialogTitle className="sr-only">{active?.alt ?? "Diagram"}</DialogTitle>
          {active && (
            <img src={active.src} alt={active.alt} className="mx-auto h-auto max-h-[88vh] w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
