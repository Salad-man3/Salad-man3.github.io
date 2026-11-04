"use client";
import * as React from "react";
import type { BugFix, Diagram } from "@/data/projects";
import { BugCard } from "@/components/BugCard";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function BugsGrid({ bugs, diagrams }: { bugs: BugFix[]; diagrams: Diagram[] }) {
  const byId = React.useMemo(() => new Map(diagrams.map((d) => [d.id, d])), [diagrams]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Diagram | null>(null);

  const openDiagram = (id: string) => {
    const d = byId.get(id);
    if (!d) return;
    setActive(d);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {bugs.map((b) => (
          <BugCard key={b.title} bug={b} onDiagram={openDiagram} />
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
