#!/usr/bin/env python3
"""Fail deploy if Ribat ER/schema diagrams are published under public/ribat/."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIAGRAMS = ROOT / "public" / "ribat" / "diagrams"
GIT_STASH = ROOT / "ribat" / "git-diagrams"

# Internal ER exports — architecture/process diagrams only on the site.
FORBIDDEN_DIAGRAM_NAMES = {
    "people-domain",
    "platform-and-tenancy",
    "courses-and-scheduling",
    "progress-and-communication",
    "ribat-runtime-context",
}


def main() -> int:
    problems: list[str] = []
    if DIAGRAMS.is_dir():
        for p in DIAGRAMS.iterdir():
            if any(f in p.name for f in FORBIDDEN_DIAGRAM_NAMES):
                problems.append(f"forbidden in public: {p.name}")
    if GIT_STASH.is_dir() and (ROOT / "public" / "ribat" / "git-diagrams").exists():
        problems.append("public/ribat/git-diagrams must not be deployed")
    if problems:
        for msg in problems:
            print(msg)
        return 1
    print("ok ribat public assets")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
