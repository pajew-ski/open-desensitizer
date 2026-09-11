# AGENTS.md

Public GitHub repo, project name **open-desensitizer**. Content: a bilateral stimulation tool in the browser. A dot moves from side to side, an optional tone pans with it, and a grounding exercise is one key away. It is a sibling of **open-entrainer** and shares its design with **temet-nosce**; the three should look and read as one family.

Target audience: someone who wants to calm down or process something on their own, without an account, an app store, or a subscription. The tool has to be understood in one screen and trusted in one read.

## Non-Goals

- No framework, no build tool, no bundler, no package manager
- No second file. The app is `index.html` alone; stylesheet and script are inline so one file can be copied anywhere and run
- No external resource of any kind: no CDN, no web font, no analytics
- No accounts, no network requests, no data leaving the page
- No manual dark/light toggle. Automatic only, via `prefers-color-scheme`
- No color. The design is achromatic; the dot is the text color on the page color
- No safety modal. The safety text is on the page, above the start button

## Repo Structure

```
/
├── AGENTS.md
├── README.md            (short: what this is, link to the Pages site)
├── LICENSE              (Unlicense)
└── index.html           (the whole app: page, stylesheet and script in one file)
```

GitHub Pages deploys from the root of `main`. The footer derives its GitHub links from the Pages URL, so a fork needs no edit.

## Design

The inline stylesheet begins with the token block from temet-nosce, verbatim. It stays verbatim in all three projects; a change to the tokens is a change to all three.

- Color: oklch with chroma 0. Light: bg 98%, surface 94%, border 85%, text 15%, muted 40%. Dark flips the scale under `prefers-color-scheme: dark`. `color-scheme: light dark` on the root so form controls follow.
- Spacing: Fibonacci in pixels, 5 8 13 21 34 55 89 144, as `--space-1` to `--space-8`.
- Type: system-ui. Base 1rem, line-height 1.618, sizes 0.875rem, 1rem, φ, φ², φ³.
- Layout: a `.shell` of 987px max width with 21px side padding. Hero, sections, footer. Text columns cap at 42rem.
- Controls: native inputs with `accent-color` set to the text color. Labels carry the name on the left and the live value on the right.
- Buttons: bordered, transparent. The primary button is inverted (text-colored surface, background-colored label). Nothing is colored, nothing glows.
- Overlays: the session stage is the page colors; the grounding screen is the page inverted, the same inversion as the primary button.

## Behavior

- Settings: speed in Hz (0.1 to 2.5, step 0.05, default 0.5), dot size in px (10 to 100, default 30), tone on or off (default off). Persisted in `localStorage` under `open-desensitizer`.
- Session: a fixed, full-viewport canvas. The dot's horizontal position is `sin(2π · speed · t)` scaled to the width minus 10% padding on each side; vertical position is the center. Each frame paints the page color at 30% alpha before the dot, so a short trail remains. The canvas reads its colors from its own computed style, so it follows the color scheme without a second palette. Device pixel ratio is respected.
- Tone: 160 Hz sine through a `StereoPannerNode`, pan `0.85 · x`, gain ramps to 0.15 over half a second and to zero over a fifth of a second on stop. The `AudioContext` is created on the first click that needs it.
- Grounding: stops the session and shows the inverted screen. Box breathing, four seconds per phase: breathe in, hold, breathe out, hold. The circle scales to φ on the in and hold phases through a four second CSS transition. A Return button and Esc close it.
- Keys: Space opens grounding whenever it is not already open (ignored while a form control is focused and no session runs). Esc closes grounding or stops the session. F toggles fullscreen. Touch users get Grounding and Stop buttons in the corner of the stage.
- On stop, focus returns to the start button.

## Copy

English throughout. Plain sentences, present tense, no exclamation marks, no emoji, no em dashes. Say what the tool does and what it does not. Warnings are stated once, above the start button, and not repeated in a modal. Product names are lowercase in headings and the footer, as in temet-nosce.

## Files

### `index.html`

One file with three parts: the `<style>` block in the head, the markup, and one `<script type="module">` at the end of the body (plus the small footer module before it).

Markup: hero with the project name and one sentence. Sections: How it works, Before you start, Session. Footer with the AGENTS.md and source links and the module that rewrites them from the Pages URL. Two overlays after the footer, both `hidden` by default: `#stage` with the canvas and a corner bar, `#grounding` with the breathing circle, the line, and the Return button.

Style block: token block, base rules (hero, sections, controls, buttons, footer), then the stage and grounding rules. `[hidden] { display: none !important }` so the overlays' flex display does not defeat the attribute.

Script block: an ES module. No globals beyond what the DOM gives. Functions: load, save, render, readColors, resize, ensureAudio, startTone, stopTone, pan, startSession, stopSession, loop, startGrounding, applyBreath, stopGrounding, toggleFullscreen, and the event wiring at the bottom.
