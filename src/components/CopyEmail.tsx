"use client"
import * as React from "react";
import { Button } from "@/components/ui/button";

export function CopyEmail({ email }: { email: string }) {
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => {
    if (!msg) return;
    const t = window.setTimeout(() => setMsg(""), 2800);
    return () => window.clearTimeout(t);
  }, [msg]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setMsg("Copied.");
    } catch {
      setMsg("Copy failed. Use the address beside it.");
    }
  }

  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <a href={`mailto:${email}`} className="font-medium underline-offset-4 hover:underline">
        {email}
      </a>
      <Button type="button" variant="outline" size="sm" onClick={copy}>
        Copy
      </Button>
      <span className="text-sm text-muted-foreground" aria-live="polite">
        {msg}
      </span>
    </span>
  );
}
