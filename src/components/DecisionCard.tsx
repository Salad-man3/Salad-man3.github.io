"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Decision } from "@/data/projects";

type Props = {
  decision: Decision;
  onDiagram?: (id: string) => void;
};

export function DecisionCard({ decision, onDiagram }: Props) {
  return (
    <Card className="gap-3 border-2 border-border bg-secondary py-4 shadow-none">
      <CardHeader className="gap-2 px-4 pb-0">
        <Badge variant="secondary" className="w-fit font-normal">
          {decision.topic}
        </Badge>
        <CardTitle className="text-base font-semibold leading-snug">
          {decision.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pt-0 text-sm leading-relaxed">
        <p className="font-medium text-foreground">{decision.rule}</p>
        {decision.rows && decision.rows.length > 0 && (
          <dl className="space-y-2">
            {decision.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-1 gap-0.5 border-t border-border pt-2 sm:grid-cols-[5rem_1fr] sm:gap-x-3">
                <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
                <dd className="min-w-0 text-sm leading-6 wrap-break-word">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {decision.diagramId && onDiagram && (
          <Button type="button" variant="outline" size="sm" onClick={() => onDiagram(decision.diagramId!)}>
            See diagram
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
