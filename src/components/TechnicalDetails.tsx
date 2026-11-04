"use client"
import * as React from "react";
import { ChevronDown } from "lucide-react";
import type { Decision, Diagram } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DecisionCard } from "@/components/DecisionCard";
import { DiagramGrid } from "@/components/DiagramGrid";

type Link = { href: string; label: string };
type PhoneShot = { src: string; alt: string; caption: string };

type Props = {
  subline: string;
  diagrams: Diagram[];
  decisions: Decision[];
  links?: Link[];
  phoneShot?: PhoneShot;
};

export function TechnicalDetails({ subline, diagrams, decisions, links, phoneShot }: Props) {
  const byId = React.useMemo(() => new Map(diagrams.map((d) => [d.id, d])), [diagrams]);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Diagram | null>(null);
  const lastTrigger = React.useRef<HTMLElement | null>(null);

  const openDiagram = React.useCallback(
    (id: string, trigger?: HTMLElement | null) => {
      const d = byId.get(id);
      if (!d) return;
      lastTrigger.current = trigger ?? null;
      setActive(d);
      setOpen(true);
    },
    [byId]
  );

  return (
    <>
      <Collapsible className="mt-6 min-w-0 overflow-hidden">
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="h-auto w-full min-w-0 justify-between gap-3 whitespace-normal border-2 border-primary px-3 py-3 text-left shadow-sm hover:bg-secondary/60 sm:px-4 sm:py-4"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-base font-semibold">Technical details</span>
              <span className="text-xs font-normal wrap-break-word whitespace-normal text-muted-foreground">{subline}</span>
            </span>
            <ChevronDown className="size-5 shrink-0 text-primary transition-transform [[data-state=open]_&]:rotate-180" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-0 min-w-0 space-y-5 overflow-hidden rounded-b-lg border border-t-0 border-primary bg-card p-3 sm:p-4">
          <DiagramGrid diagrams={diagrams} onOpen={openDiagram} />
          {phoneShot && (
            <figure className="m-0 text-center">
              <figcaption className="mb-2 text-xs text-muted-foreground">{phoneShot.caption}</figcaption>
              <img
                src={phoneShot.src}
                alt={phoneShot.alt}
                width={780}
                height={1688}
                loading="lazy"
                className="mx-auto w-48 max-w-full rounded-md border shadow-sm sm:w-56"
              />
            </figure>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {decisions.map((d) => (
              <DecisionCard key={d.title} decision={d} onDiagram={(id) => openDiagram(id)} />
            ))}
          </div>
          {links && links.length > 0 && (
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="underline-offset-4 hover:underline">
                  {l.label}
                </a>
              ))}
            </p>
          )}
        </CollapsibleContent>
      </Collapsible>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v);
          if (!v && lastTrigger.current) lastTrigger.current.focus();
        }}
      >
        <DialogContent className="max-h-[96vh] w-[min(96vw,90rem)] max-w-[min(96vw,90rem)] overflow-auto p-3 sm:max-w-[min(96vw,90rem)] sm:p-6">
          <DialogTitle className="sr-only">{active?.alt ?? "Diagram enlarged"}</DialogTitle>
          {active && (
            <img src={active.src} alt={active.alt} className="mx-auto h-auto max-h-[88vh] w-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
