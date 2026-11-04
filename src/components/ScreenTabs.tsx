"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ScreenTab } from "@/data/projects";

export function ScreenTabs({ tabs }: { tabs: ScreenTab[] }) {
  return (
    <Tabs defaultValue={tabs[0]?.id} className="my-4 min-w-0">
      <TabsList className="mb-3 grid h-auto w-full grid-cols-2 gap-1 bg-muted p-1 sm:flex sm:h-auto sm:flex-wrap sm:justify-start">
        {tabs.map((t) => (
          <TabsTrigger
            key={t.id}
            value={t.id}
            className="h-auto min-h-9 flex-none whitespace-normal px-2 py-2 text-sm leading-snug"
          >
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((t) => (
        <TabsContent key={t.id} value={t.id} className="mt-0 min-w-0">
          <div className="overflow-hidden rounded-lg border bg-secondary shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2" aria-hidden="true">
              <span className="size-2 rounded-full bg-red-400" />
              <span className="size-2 rounded-full bg-amber-400" />
              <span className="size-2 rounded-full bg-green-500" />
            </div>
            <img src={t.src} alt={t.alt} width={1440} height={900} loading="lazy" className="block h-auto w-full" />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
