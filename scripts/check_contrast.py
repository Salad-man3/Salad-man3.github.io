#!/usr/bin/env python3
"""Quick WCAG contrast check for portfolio CSS tokens."""

from __future__ import annotations


def srgb(c: float) -> float:
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4


def lum(hex_color: str) -> float:
    h = hex_color.lstrip("#")
    r, g, b = (int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))
    return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)


def ratio(fg: str, bg: str) -> float:
    l1, l2 = lum(fg), lum(bg)
    lighter, darker = max(l1, l2), min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)


PAIRS = [
    ("ink on film", "#14202b", "#f2f5f7"),
    ("ink-2 on film", "#4a5c6a", "#f2f5f7"),
    ("cyan-ink on cyan", "#d6e6f3", "#0f3a5f"),
    ("cyan-muted on cyan", "#9eb8cf", "#0f3a5f"),
    ("yellow-ink on yellow", "#3d3208", "#e9b824"),
    ("white sheet ink", "#14202b", "#ffffff"),
]


def main() -> int:
    failed = False
    for name, fg, bg in PAIRS:
        r = ratio(fg, bg)
        ok = r >= 4.5
        print(f"{'ok' if ok else 'FAIL'}  {name}: {r:.2f}")
        failed |= not ok
    if failed:
        return 1
    print("ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
