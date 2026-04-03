# GNU Emacs Manual - Reading Mode + Theme Toggle

Author: Andrea Alberti (March 2026)

Improves the reading experience on the official GNU Emacs manuals:

- centered rounded reading card with sane measure + typography
- Light/Dark/Auto theme toggle (persisted via `localStorage`)
- rebuilt symmetric navigation (Prev / Up / Next + Contents / Index)
- dark-mode fixes for upstream hard-coded table and definition-list colors

See [SPECIFICATIONS.md](SPECIFICATIONS.md) for a detailed list of specifications of the userscript.

## Install

Open `scripts/emacs-manual-themer/script.user.js` with Violentmonkey installed.

## Target

- `https://www.gnu.org/software/emacs/manual/*`
- `https://gnu.org/software/emacs/manual/*`

## Screenshots

Place screenshots in `scripts/emacs-manual-themer/screenshots/`:

- `screenshot-light.jpg`
- `screenshot-dark.jpg`

Optionally copy one of them to `preview.jpg`.
