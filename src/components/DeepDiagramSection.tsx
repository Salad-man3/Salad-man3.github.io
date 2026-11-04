"use client"
import * as React from "react";
import type { Diagram } from "@/data/projects";
import { DiagramGrid } from "@/components/DiagramGrid";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DeepDiagramSection({ diagrams }: { diagrams: Diagram[] }) {
  const byId = React.useMemo(() => new Map(diagrams.map((d) => [d.id, d])), [diagrams]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Diagram | null>(null);
  const lastTrigger = React.useRef<HTMLElement | null>(null);

  const openDiagram = (id: string, trigger: HTMLElement) => {
    const d = byId.get(id);
    if (!d) return;
    lastTrigger.current = trigger;
    setActive(d);
    setOpen(true);
  };

  return (
    <>
      <DiagramGrid diagrams={diagrams} onOpen={openDiagram} className="mb-6" />
      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v && lastTrigger.current) lastTrigger.current.focus();
        }}
      >
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
