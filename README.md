# open desensitizer

Bilateral stimulation in the browser. A dot moves from side to side, an optional tone follows it between the ears, and a grounding exercise is one key away. One HTML file with everything in it, nothing else.

**Site**: [pajew-ski.github.io/open-desensitizer](https://pajew-ski.github.io/open-desensitizer/)

## How it works

Bilateral stimulation alternates a stimulus between the left and the right side of the body. Here that is a point the eyes track across the screen and, if you want it, a 160 Hz sine tone that pans in step with it. The eye movement resembles the rapid eye movement of dreaming sleep, and the same left-right alternation is the mechanical part of EMDR therapy. Used on its own it tends to settle the nervous system; used while holding a difficult memory in mind it can make that memory easier to carry.

The page is a document that explains the tool and holds its two settings, speed and dot size. Starting a session covers the page with a canvas. Pressing Space at any time covers everything with the grounding screen: colors inverted, a circle that breathes in a four second box, and a line to read.

Everything runs locally. Nothing is sent anywhere. The settings are kept in `localStorage`.

## Using it

1. Sit comfortably. Put on headphones if you turn the tone on.
2. Choose a speed. One full left-right cycle per second is 1 Hz; most people settle between 0.5 and 1 Hz.
3. Start the session and follow the dot with your eyes only. Keep your head still.
4. Think of what you want to work on, or think of nothing and let it settle you.
5. Space starts the grounding exercise, Esc stops the session, F toggles fullscreen. The same controls sit in the corner of the session for touch screens.

## Before you use it

This is a self-help tool, not therapy, and it does not replace treatment for trauma. Do not use it with photosensitive epilepsy. With a dissociative disorder, ask a clinician first. Use it at your own responsibility, and stop when it stops feeling right.

## Running it locally

```bash
git clone https://github.com/pajew-ski/open-desensitizer.git
cd open-desensitizer
open index.html
```

The whole app is `index.html`; copy that one file anywhere and it runs. There is no build step and no dependency. Any static host serves it as is; on GitHub Pages, deploy from the root of `main`. The footer links adapt to a fork automatically.

Everything here was built by a coding agent from [AGENTS.md](AGENTS.md), which is the design and behavior spec of the tool.

## License

Public domain under the [Unlicense](LICENSE). Copy it, change it, sell it, build on it. Tools for calming down should be free.
