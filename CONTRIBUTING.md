# Contributing Userscripts

The goal is: one folder per userscript, easy review, predictable layout, and a clean gallery.

## Add A New Script

Add a new folder:

`scripts/<slug>/`

Required contents:

- `scripts/<slug>/script.user.js`
  - Must include a userscript header (`// ==UserScript== ... // ==/UserScript==`).
  - Prefer readable source (no minified/obfuscated code).
  - Avoid broad matches; keep `@match`/`@include` specific.
- `scripts/<slug>/README.md`
  - What the script does, which pages it targets, known limitations.
- `scripts/<slug>/meta.yml`
  - Small metadata file used by the gallery.
- `scripts/<slug>/screenshots/preview.png`
  - One representative screenshot for the main gallery.

Optional contents:

- `scripts/<slug>/screenshots/*.png` for additional screenshots.

## Metadata Format (`meta.yml`)

Keep it simple and consistent:

- `name`: script display name
- `author`: handle/name
- `contributed`: contribution date (ISO-8601, e.g. `2026-03-30`)
- `updated`: optional last update date (ISO-8601)
- `targets`: list of URL patterns
- `tags`:
  - `platform`: `desktop` and/or `mobile`
  - `theme`: `light`, `dark`, and/or `auto`
  - `type`: a few short keywords (e.g. `restyle`, `navigation`, `fixes`, `productivity`)
- `screenshots.preview`: relative path to preview image

## Safety / Privacy Rules

- No credential harvesting, tracking, analytics beacons, or hidden network calls.
- No remote-code execution patterns (e.g. fetching arbitrary JS and `eval`-ing it).
- Prefer `@grant none` unless you truly need GM APIs.

## Screenshot Guidelines

- Do not include personal data (emails, tokens, names).
- Aim for readable size (roughly 1200-1800 px wide).

## Template

See `scripts/_template/`.
