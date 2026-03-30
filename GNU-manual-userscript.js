// ==UserScript==
// @name         GNU Emacs Manual - Reading Mode + Dark Toggle
// @namespace    local.andrea.gnu-emacs-manual
// @version      0.2.0
// @description  Improve readability (width/typography) + dark mode toggle on gnu.org Emacs manual pages
// @match        https://www.gnu.org/software/emacs/manual/*
// @match        http://www.gnu.org/software/emacs/manual/*
// @match        https://gnu.org/software/emacs/manual/*
// @match        http://gnu.org/software/emacs/manual/*
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function () {
  "use strict";

  const STORAGE_KEY = "vmEmacsManualTheme"; // "auto" | "dark" | "light"

  function getStoredTheme() {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "dark" || v === "light" || v === "auto" ? v : "auto";
  }

  function setStoredTheme(v) {
    localStorage.setItem(STORAGE_KEY, v);
  }

  const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(mode) {
    const root = document.documentElement;
    root.classList.add("vm-emacs-manual");
    root.classList.toggle("vm-theme-dark", mode === "dark");
    root.classList.toggle("vm-theme-light", mode === "light");
    root.classList.toggle("vm-theme-auto", mode === "auto");

    const systemDark = !!(mq && mq.matches);
    const effectiveDark = mode === "dark" || (mode === "auto" && systemDark);

    root.classList.toggle("vm-effective-dark", effectiveDark);
    root.classList.toggle("vm-effective-light", !effectiveDark);
  }

  function currentMode() {
    return getStoredTheme();
  }

  function nextModeOnClick(ev) {
    // Click: toggle light/dark. Shift-click: set auto.
    if (ev && ev.shiftKey) return "auto";
    const mode = currentMode();
    const effectiveDark = document.documentElement.classList.contains("vm-effective-dark");
    if (mode === "auto") return effectiveDark ? "light" : "dark";
    return mode === "dark" ? "light" : "dark";
  }

  function modeLabel(mode) {
    if (mode === "auto") return "Auto";
    if (mode === "dark") return "Dark";
    return "Light";
  }

  // Apply early to minimize flash.
  applyTheme(getStoredTheme());

  if (mq && typeof mq.addEventListener === "function") {
    mq.addEventListener("change", () => {
      if (getStoredTheme() === "auto") applyTheme("auto");
    });
  } else if (mq && typeof mq.addListener === "function") {
    mq.addListener(() => {
      if (getStoredTheme() === "auto") applyTheme("auto");
    });
  }

  GM_addStyle(`
/* ---------- Theme + layout ---------- */
:root.vm-emacs-manual {
  color-scheme: light dark;
  --vm-radius: 14px;
  --vm-shadow: 0 10px 30px rgba(0,0,0,.12);
  --vm-border: rgba(0,0,0,.12);
  --vm-muted: rgba(0,0,0,.62);
  --vm-link: #0b5bd3;
  --vm-link-visited: #6b2fbf;
  --vm-focus: rgba(11, 91, 211, .28);

  --vm-bg: #fbfaf7;
  --vm-surface: #ffffff;
  --vm-fg: #1b1b1b;
  --vm-code-bg: #f3f1ea;
  --vm-code-border: rgba(0,0,0,.10);
  --vm-kbd-bg: #f2f2f2;

  --vm-serif: "Charter", "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif;
  --vm-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

:root.vm-emacs-manual.vm-effective-dark {
  --vm-border: rgba(255,255,255,.14);
  --vm-muted: rgba(255,255,255,.70);
  --vm-link: #7bb6ff;
  --vm-link-visited: #d2a6ff;

  --vm-bg: #0f1115;
  --vm-surface: #151923;
  --vm-fg: #e9edf5;
  --vm-code-bg: #0c0f15;
  --vm-code-border: rgba(255,255,255,.14);
  --vm-kbd-bg: rgba(255,255,255,.10);

  --vm-shadow: 0 14px 40px rgba(0,0,0,.50);
  --vm-focus: rgba(123, 182, 255, .22);
}

html.vm-emacs-manual, html.vm-emacs-manual body {
  background: radial-gradient(1200px 800px at 20% -10%, rgba(123,182,255,.12), transparent 55%),
              radial-gradient(1000px 700px at 100% 0%, rgba(210,166,255,.10), transparent 55%),
              var(--vm-bg) !important;
  color: var(--vm-fg) !important;
}

html.vm-emacs-manual body {
  font-family: var(--vm-serif) !important;
  font-size: 18px !important;
  line-height: 1.7 !important;
  letter-spacing: 0.1px;
  margin: 0 !important;
}

@media (max-width: 520px) {
  html.vm-emacs-manual body { font-size: 16.5px !important; }
}

html.vm-emacs-manual :focus-visible {
  outline: 3px solid var(--vm-focus) !important;
  outline-offset: 2px;
  border-radius: 8px;
}

html.vm-emacs-manual ::selection {
  background: rgba(123,182,255,.35);
}

/* Constrain the main Texinfo wrapper(s) without depending on a single class name */
html.vm-emacs-manual body > div[class$="-level-extent"],
html.vm-emacs-manual body > div.section-level-extent,
html.vm-emacs-manual body > div.chapter-level-extent,
html.vm-emacs-manual body > div.top-level-extent {
  max-width: 82ch;
  margin: 0 auto !important;
  padding: clamp(16px, 3vw, 42px) clamp(14px, 4vw, 56px) !important;
  background: color-mix(in oklab, var(--vm-surface) 92%, transparent);
  border: 1px solid var(--vm-border);
  border-radius: calc(var(--vm-radius) + 4px);
  box-shadow: var(--vm-shadow);
}

/* Links */
html.vm-emacs-manual a {
  color: var(--vm-link) !important;
  text-decoration-thickness: .08em;
  text-underline-offset: .16em;
}
html.vm-emacs-manual a:visited { color: var(--vm-link-visited) !important; }
html.vm-emacs-manual a:hover { text-decoration-thickness: .12em; }

/* Headings */
html.vm-emacs-manual h1,
html.vm-emacs-manual h2,
html.vm-emacs-manual h3,
html.vm-emacs-manual h4 {
  color: var(--vm-fg) !important;
  background: transparent !important;
  letter-spacing: .2px;
  line-height: 1.25;
  margin-top: 1.1em;
}
html.vm-emacs-manual h1 a,
html.vm-emacs-manual h2 a,
html.vm-emacs-manual h3 a,
html.vm-emacs-manual h4 a {
  color: inherit !important;
}
html.vm-emacs-manual h3.section {
  font-size: 1.55em;
  margin-top: .2em;
}

/* Nav panels: make them readable, wrap nicely */
html.vm-emacs-manual .nav-panel {
  color: var(--vm-muted) !important;
  background: color-mix(in oklab, var(--vm-surface) 70%, transparent);
  border: 1px solid var(--vm-border);
  border-radius: var(--vm-radius);
  padding: 10px 12px;
}
html.vm-emacs-manual .nav-panel p {
  margin: 0;
  overflow-wrap: anywhere;
}

/* Horizontal rules */
html.vm-emacs-manual hr {
  border: 0;
  border-top: 1px solid var(--vm-border);
  margin: 18px 0;
}

/* Inline code + kbd + samp */
html.vm-emacs-manual code,
html.vm-emacs-manual .code,
html.vm-emacs-manual samp,
html.vm-emacs-manual .samp {
  font-family: var(--vm-mono) !important;
  font-size: .92em;
  background: var(--vm-code-bg);
  border: 1px solid var(--vm-code-border);
  padding: .12em .38em;
  border-radius: 10px;
}

html.vm-emacs-manual kbd,
html.vm-emacs-manual .kbd,
html.vm-emacs-manual kbd.key,
html.vm-emacs-manual .key {
  font-family: var(--vm-mono) !important;
  font-size: .9em;
  background: var(--vm-kbd-bg);
  border: 1px solid var(--vm-border);
  padding: .10em .42em;
  border-bottom-width: 2px;
  border-radius: 10px;
}

/* Pre blocks if present */
html.vm-emacs-manual pre {
  font-family: var(--vm-mono) !important;
  font-size: .92em;
  line-height: 1.55;
  background: var(--vm-code-bg);
  border: 1px solid var(--vm-code-border);
  padding: 14px 14px;
  border-radius: var(--vm-radius);
  overflow: auto;
}

/* Texinfo "table" dl formatting */
html.vm-emacs-manual dl.table {
  margin: 16px 0;
  padding: 12px 12px;
  border: 1px solid var(--vm-border);
  border-radius: var(--vm-radius);
  background: color-mix(in oklab, var(--vm-surface) 65%, transparent);
}
html.vm-emacs-manual dl.table > dt {
  font-weight: 650;
  margin-top: 10px;
}
html.vm-emacs-manual dl.table > dt:first-child { margin-top: 0; }
html.vm-emacs-manual dl.table > dd { margin: 6px 0 0 0; }
html.vm-emacs-manual dl.table > dd p { margin: 0; }

/* ---------- Rebuilt nav (Prev/Up/Next + Contents/Index) ---------- */
.vm-emacs-manual .vm-doc-nav {
  margin: 14px 0;
  padding: 12px;
  border: 1px solid var(--vm-border);
  border-radius: var(--vm-radius);
  background: color-mix(in oklab, var(--vm-surface) 72%, transparent);
}

.vm-emacs-manual .vm-doc-nav[data-pos="top"] {
  margin-top: 0;
}

.vm-emacs-manual .vm-doc-nav[data-pos="bottom"] {
  margin-bottom: 0;
}

.vm-emacs-manual .vm-doc-nav-primary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.vm-emacs-manual .vm-doc-nav-item {
  display: block;
  padding: 10px 10px;
  border-radius: calc(var(--vm-radius) - 2px);
  border: 1px solid var(--vm-border);
  background: color-mix(in oklab, var(--vm-surface) 85%, transparent);
  text-decoration: none !important;
}

.vm-emacs-manual .vm-doc-nav-item:hover {
  border-color: color-mix(in oklab, var(--vm-border) 60%, var(--vm-link) 40%);
}

.vm-emacs-manual .vm-doc-nav-kicker {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  font-family: ui-sans-serif, "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
  font-size: 12px;
  letter-spacing: .3px;
  text-transform: uppercase;
  color: var(--vm-muted);
}

.vm-emacs-manual .vm-doc-nav-arrow {
  opacity: .8;
}

.vm-emacs-manual .vm-doc-nav-title {
  display: block;
  margin-top: 4px;
  font-family: var(--vm-serif);
  font-size: 16px;
  line-height: 1.25;
  color: var(--vm-fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vm-emacs-manual .vm-doc-nav-secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed var(--vm-border);
}

.vm-emacs-manual .vm-doc-nav-secondary a {
  font-family: ui-sans-serif, "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
  font-size: 13px;
  text-decoration: none !important;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid var(--vm-border);
  background: color-mix(in oklab, var(--vm-surface) 86%, transparent);
}

.vm-emacs-manual .vm-doc-nav-secondary a:hover {
  border-color: color-mix(in oklab, var(--vm-border) 60%, var(--vm-link) 40%);
}

@media (max-width: 720px) {
  .vm-emacs-manual .vm-doc-nav-primary {
    grid-template-columns: 1fr;
  }
  .vm-emacs-manual .vm-doc-nav-title {
    white-space: normal;
    overflow: visible;
    text-overflow: clip;
  }
}

/* ---------- Floating toggle button ---------- */
#vmEmacsManualThemeBtn {
  position: fixed;
  right: 14px;
  bottom: 14px;
  z-index: 2147483647;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 999px;
  border: 1px solid var(--vm-border);
  background: color-mix(in oklab, var(--vm-surface) 78%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--vm-fg);
  box-shadow: var(--vm-shadow);
  cursor: pointer;
  user-select: none;
}

#vmEmacsManualThemeBtn:hover {
  transform: translateY(-1px);
}

#vmEmacsManualThemeBtn:active {
  transform: translateY(0px);
}

#vmEmacsManualThemeBtn .vm-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
}

#vmEmacsManualThemeBtn .vm-label {
  font-family: ui-sans-serif, "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
  font-size: 13px;
  letter-spacing: .2px;
  opacity: .95;
}

#vmEmacsManualThemeBtn .vm-hint {
  font-family: ui-sans-serif, "Avenir Next", "Gill Sans", "Trebuchet MS", sans-serif;
  font-size: 12px;
  color: var(--vm-muted);
}

@media (max-width: 520px) {
  #vmEmacsManualThemeBtn { right: 10px; bottom: 10px; }
  #vmEmacsManualThemeBtn .vm-hint { display: none; }
}
  `);

  function ensureButton() {
    if (document.getElementById("vmEmacsManualThemeBtn")) return;

    const btn = document.createElement("button");
    btn.id = "vmEmacsManualThemeBtn";
    btn.type = "button";
    btn.title = "Toggle theme (Shift-click: Auto)";
    btn.setAttribute("aria-label", "Toggle theme");

    const icon = document.createElement("span");
    icon.className = "vm-icon";
    icon.innerHTML = `
<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M12 18a6 6 0 1 1 5.2-9.0a7.5 7.5 0 1 0-8.2 10.0A5.95 5.95 0 0 0 12 18Z"/>
</svg>`.trim();

    const label = document.createElement("span");
    label.className = "vm-label";

    const hint = document.createElement("span");
    hint.className = "vm-hint";
    hint.textContent = "Shift: Auto";

    function render() {
      const mode = currentMode();
      label.textContent = modeLabel(mode);
      btn.setAttribute("data-mode", mode);
      btn.setAttribute(
        "aria-pressed",
        String(document.documentElement.classList.contains("vm-effective-dark"))
      );
    }

    btn.addEventListener("click", (ev) => {
      const next = nextModeOnClick(ev);
      setStoredTheme(next);
      applyTheme(next);
      render();
    });

    btn.append(icon, label, hint);
    document.body.appendChild(btn);
    render();
  }

  window.addEventListener("DOMContentLoaded", ensureButton, { once: true });

  function hideNavPanel(panel) {
    if (!panel || panel.nodeType !== 1) return;
    panel.style.display = "none";

    const prev = panel.previousElementSibling;
    if (prev && prev.tagName === "HR") prev.style.display = "none";
    const next = panel.nextElementSibling;
    if (next && next.tagName === "HR") next.style.display = "none";
  }

  function pickLink(panel, rel, accesskey) {
    if (!panel) return null;
    let a = panel.querySelector(`a[rel="${rel}"]`);
    if (!a && accesskey) a = panel.querySelector(`a[accesskey="${accesskey}"]`);
    return a || null;
  }

  function extractNavData() {
    const panels = Array.from(document.querySelectorAll(".nav-panel"));
    if (!panels.length) return null;

    const pickAcrossPanels = (rel, accesskey) => {
      for (const p of panels) {
        const a = pickLink(p, rel, accesskey);
        if (a && a.getAttribute("href")) return a;
      }
      return null;
    };

    const prevA = pickAcrossPanels("prev", "p");
    const upA = pickAcrossPanels("up", "u");
    const nextA = pickAcrossPanels("next", "n");
    const contentsA = pickAcrossPanels("contents") || pickAcrossPanels("toc") || pickAcrossPanels("tableofcontents");
    const indexA = pickAcrossPanels("index");

    const mk = (a) => {
      if (!a) return null;
      const href = a.getAttribute("href");
      if (!href) return null;
      const title = (a.textContent || "").trim().replace(/\s+/g, " ");
      return { href, title: title || href };
    };

    const data = {
      prev: mk(prevA),
      up: mk(upA),
      next: mk(nextA),
      contents: mk(contentsA),
      index: mk(indexA),
      _panels: panels,
    };

    if (!data.prev && !data.up && !data.next && !data.contents && !data.index) return null;
    return data;
  }

  function createNavItem(kind, label, arrow, link) {
    if (!link) return null;

    const a = document.createElement("a");
    a.className = `vm-doc-nav-item vm-doc-nav-${kind}`;
    a.href = link.href;
    a.setAttribute("aria-label", `${label}: ${link.title}`);

    const kicker = document.createElement("span");
    kicker.className = "vm-doc-nav-kicker";

    const kickerText = document.createElement("span");
    kickerText.textContent = label;

    const kickerArrow = document.createElement("span");
    kickerArrow.className = "vm-doc-nav-arrow";
    kickerArrow.textContent = arrow;

    kicker.append(kickerText, kickerArrow);

    const title = document.createElement("span");
    title.className = "vm-doc-nav-title";
    title.textContent = link.title;
    title.title = link.title;

    a.append(kicker, title);
    return a;
  }

  function createNavBar(navData, pos) {
    const nav = document.createElement("nav");
    nav.className = "vm-doc-nav";
    nav.setAttribute("data-pos", pos);
    nav.setAttribute("aria-label", pos === "top" ? "Page navigation (top)" : "Page navigation (bottom)");

    const primary = document.createElement("div");
    primary.className = "vm-doc-nav-primary";

    const prev = createNavItem("prev", "Previous", "<-", navData.prev);
    const up = createNavItem("up", "Up", "^", navData.up);
    const next = createNavItem("next", "Next", "->", navData.next);

    // Keep a stable 3-column rhythm: if a slot is missing, insert an empty spacer.
    const spacer = () => {
      const s = document.createElement("div");
      s.setAttribute("aria-hidden", "true");
      return s;
    };

    primary.append(prev || spacer(), up || spacer(), next || spacer());
    nav.appendChild(primary);

    const secondaryLinks = [];
    if (navData.contents) secondaryLinks.push({ label: "Contents", ...navData.contents });
    if (navData.index) secondaryLinks.push({ label: "Index", ...navData.index });

    if (secondaryLinks.length) {
      const secondary = document.createElement("div");
      secondary.className = "vm-doc-nav-secondary";

      for (const l of secondaryLinks) {
        const a = document.createElement("a");
        a.href = l.href;
        a.textContent = l.label;
        a.setAttribute("aria-label", `${l.label}: ${l.title}`);
        a.title = l.title;
        secondary.appendChild(a);
      }

      nav.appendChild(secondary);
    }

    return nav;
  }

  function ensureDocNav() {
    if (document.querySelector(".vm-doc-nav")) return;

    const navData = extractNavData();
    if (!navData) return;

    const wrapper = document.querySelector(
      'body > div[class$="-level-extent"], body > div.section-level-extent, body > div.chapter-level-extent, body > div.top-level-extent'
    ) || document.body;

    const topNav = createNavBar(navData, "top");
    const bottomNav = createNavBar(navData, "bottom");

    wrapper.insertBefore(topNav, wrapper.firstChild);
    wrapper.appendChild(bottomNav);

    for (const p of navData._panels) hideNavPanel(p);
  }

  window.addEventListener("DOMContentLoaded", ensureDocNav, { once: true });
})();
