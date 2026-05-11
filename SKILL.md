---
name: oncite-design
description: Use this skill to generate well-branded interfaces and assets for oncite (music artist), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping the dark + nostalgic + slightly-broken oncite_os aesthetic.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## quick brief
- **mood:** dark + nostalgic + slightly broken — corrupted late-90s/Y2K desktop OS
- **anti-mood:** bright neon green (brat), candy Y2K, rainbow UI, purple-blue gradients, emoji
- **lowercase always** — wordmark, headlines, button labels
- **palette:** soot blacks, dead-CRT blue, damp-tile teal, bone+rust+piss-yellow accents
- **type:** Archivo Black display, Inter UI, IBM Plex Mono chrome, VT323 errors, Special Elite notes (all Google Fonts subs — flag if user wants real fonts)
- **icons:** OS-style beveled tiles with unicode glyphs, never emoji
- **chrome:** sharp corners, bevels (not soft shadows), hard 4–6px black drops on windows
- **voice:** quiet · broken · slightly off · no exclamation marks · no emoji · multilingual leak ok

## starting points
- `colors_and_type.css` — drop into any HTML to inherit the full token system
- `ui_kits/oncite-os/` — full clickable desktop demo + reusable `<Window>` / `<Popup>` / `<MusicPlayer>` / `<Gallery>` / `<Memories>` / `<About>` / `<Links>` components
- `preview/*.html` — single-component examples for color, type, buttons, popups, etc.
- `assets/refs/` — original mood references for the artist's visual world
