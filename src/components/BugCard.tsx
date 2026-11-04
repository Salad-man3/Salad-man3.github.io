"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BugFix } from "@/data/projects";

type Props = { bug: BugFix; onDiagram?: (id: string) => void };

export function BugCard({ bug, onDiagram }: Props) {
  return (
    <Card className="gap-3 border-2 border-border bg-secondary py-4 shadow-none">
      <CardHeader className="px-4 pb-0">
        <CardTitle className="text-base font-semibold leading-snug">{bug.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-4 pt-2 text-sm">
        <dl className="space-y-2">
          {bug.rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-0.5 border-t border-border pt-2 sm:grid-cols-[5.5rem_1fr] sm:gap-x-3">
              <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
              <dd className="min-w-0 text-sm leading-6 wrap-break-word">{row.value}</dd>
            </div>
          ))}
        </dl>
        {bug.diagramId && onDiagram && (
          <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => onDiagram(bug.diagramId!)}>
            See diagram
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
