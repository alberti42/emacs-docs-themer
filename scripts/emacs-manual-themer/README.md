# GNU Emacs Manual - Reading Mode + Theme Toggle

Author: Andrea Alberti (March 2026)

Improves the reading experience on the official GNU Emacs manuals:

- centered rounded reading card with sane measure + typography
- Light/Dark/Auto theme toggle (persisted via `localStorage`)
- rebuilt symmetric navigation (Prev / Up / Next + Contents / Index)
- dark-mode fixes for upstream hard-coded table and definition-list colors

See [SPECIFICATIONS.md](SPECIFICATIONS.md) for a detailed list of specifications of the userscript.

## Install

👉 **[Click here to install from GitHub](https://github.com/alberti42/emacs-docs-themer/raw/main/scripts/emacs-manual-themer/script.user.js)** (requires Violentmonkey/Tampermonkey)

Alternatively, open `script.user.js` in this folder and click the "Raw" button.

## Try it out

Once installed, visit any official manual page to see the new layout and theme toggle:

👉 **[An Introduction to Programming in Emacs Lisp](https://www.gnu.org/software/emacs/manual/html_node/eintr/index.html)**

## Target

- `https://www.gnu.org/software/emacs/manual/*`
- `https://gnu.org/software/emacs/manual/*`

## Screenshots

<img src="screenshots/screenshot-light.jpg" alt="Light Mode" width="45%"> <img src="screenshots/screenshot-dark.jpg" alt="Dark Mode" width="45%">

