# Salah Joja — Portfolio

Live at <https://salad-man3.github.io/>

A single page: who I am, the API I built, the bugs worth writing down, and how
to reach me.

## Contents

| Path | What it is |
|------|------------|
| `index.html` | The page |
| `styles.css` | All styling — hand-authored, no framework |
| `script.js` | Section index toggle, copy-email, scrollspy |
| `404.html` | Not-found page, reuses `/styles.css` |
| `cv/` | Printable CVs, Node.js and Laravel tracks |

## Design notes

Two grounds carry the argument the page is making. **Paper** is what I claim;
the **dark console panels** are what the machine produced — request traces,
incident reports. Evidence stays visually separable from assertion.

The typographic rule: **labels are sans, machine values are mono.** Spline Sans
Mono appears on routes, counts, cache keys, and dates — anywhere a machine
wrote the string — and never just to make a label look technical. Instrument
Sans does everything a person wrote.

Colour is data. The green, amber, and red only ever attach to a real status —
a response code, an incident's severity. Nothing is tinted for decoration.

There is exactly one animation: the hero's call-count bar collapsing from five
requests to two, once, on load. It is disabled under
`prefers-reduced-motion`, where the end state renders directly.

## The CVs are not edited here

`cv/` is **build output**. The canonical source lives in the career-hub repo at
`portfolio/cv/`; run `python3 portfolio/cv/sync_cv.py` there to publish changes
into this repo, then commit them here. Editing `cv/` directly will be
overwritten on the next sync.

## Local preview

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080>. Do not open the files over `file://` — the
root-relative paths in `404.html` will not resolve.

## Deploy

GitHub Pages serves the `main` branch root. Push to `main` to publish.
