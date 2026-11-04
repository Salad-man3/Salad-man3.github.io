# Salah Joja — Portfolio

Live at <https://salad-man3.github.io/>

Astro + React (islands) portfolio with **shadcn/ui**, Geist Sans/Mono, and Amiri for Arabic names. Plain-language project stories for everyone; **Technical details** panels and deep pages for implementation detail.

## Stack

- [Astro 5](https://astro.build/) static site
- [shadcn/ui](https://ui.shadcn.com/) (Radix + Tailwind v4)
- Interactive islands: screen tabs, technical-details collapsible, diagram lightbox, copy email

## Contents

| Path | What it is |
|------|------------|
| `src/pages/index.astro` | Home: hero (no request trace), Ghaya, Ribat (`#ribat`), toolbox, contact |
| `src/pages/ghaya/` | Ghaya Go under the hood |
| `src/pages/ribat/` | Ribat under the hood |
| `public/ghaya/`, `public/ribat/` | Screenshots, diagrams, tour video |
| `public/cv/` | CV PDF (build output from career hub) |
| `public/assets/icons/` | Toolbox icons |

## Local development

Requires **Node 24+** (Astro 5).

```sh
npm install
npm run dev
```

Open <http://localhost:4321>.

Production build:

```sh
npm run build
npm run preview   # serves dist/
```

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds with `npm ci` and publishes `dist/` via GitHub Actions.

One-time repo setting: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Until that switch, pushing `main` with only static HTML will not run this workflow’s output on Pages.

## CV

`public/cv/` is **build output**. Source lives in the career-hub repo; run `python3 portfolio/cv/sync_cv.py` there, then copy into `public/cv/` here.

## Contrast check (optional)

```sh
python3 scripts/check_contrast.py
```

## Diagram sources

- Ribat: Eraser exports in `public/ribat/diagrams/` (WebP)
- Ghaya: SVGs in `public/ghaya/diagrams/`; Mermaid sources in `scripts/diagrams/`

## Ribat on the public site

Only **process/architecture** diagrams belong under `public/ribat/diagrams/` (Eraser exports). Do **not** copy ER or schema diagrams (`people-domain`, `platform-and-tenancy`, etc.) or `ribat/git-diagrams/` into `public/`. CI runs `python3 scripts/check_ribat_privacy.py` before build.

Screenshots use the public Ribat **demo seed** (fake names and phones); that is intentional. Re-capture with `node ../scripts/capture-ribat-portfolio.mjs` from the career-hub repo when UI changes.
