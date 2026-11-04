"use client"
import { cn } from "cn";
import type { Diagram } from "@/data/projects";

type Props = {
  diagrams: Diagram[];
  onOpen: (id: string, trigger: HTMLElement) => void;
  className?: string;
};

export function DiagramGrid({ diagrams, onOpen, className }: Props) {
  const visible = diagrams.filter((d) => !d.hidden);
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-3", className)}>
      {visible.map((d) => (
        <figure key={d.id} className="m-0 min-w-0 rounded-lg border border-border bg-secondary p-3 shadow-sm">
          <figcaption className="mb-2 text-xs leading-snug text-foreground/90">{d.caption}</figcaption>
          <button
            type="button"
            className="flex h-44 w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-md border border-border bg-background p-2 transition hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:h-56"
            onClick={(e) => onOpen(d.id, e.currentTarget)}
          >
            <img src={d.src} alt="" className="max-h-full max-w-full object-contain" loading="lazy" />
          </button>
        </figure>
      ))}
    </div>
  );
}
