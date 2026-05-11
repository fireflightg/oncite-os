# oncite — design system

> dark + nostalgic + slightly broken
> a music artist's design system that looks like a corrupted Win98/XP desktop seen through CRT haze.

---

## What is oncite?

**oncite** is a music artist. The brand identity sits in the negative space of contemporary pop visuals — where a Charli XCX *brat* is bright neon green and aggressively flat, oncite is dim, cluttered, and pretending to crash on you. It is the *desktop you forgot to close* before falling asleep at 3am with a half-uploaded demo.

The system reads as a fictional operating system — **oncite_os** — that the listener navigates: click `music.mp3` to hear tracks, `visuals/` to browse photos, `memories/` for unsaved typewriter notes, `about.txt` for the artist info, `links.exe` for socials.

### Anchor moods (do these)
- **dark + nostalgic + slightly broken** — every surface is dim, every interaction is one popup or error away from breaking
- **muted, never neon** — bone, rust, piss-yellow, dead-CRT blue, damp-bathroom teal
- **layered + messy** — overlapping windows, dragged-out popups, taped-on stickers, half-deleted notes
- **clean typography over chaotic visuals** — the type is precise, the imagery is messy
- **lowercase always** — wordmark, headlines, button labels

### Anti-moods (do NOT do these)
- ❌ bright green / brat / candy
- ❌ rainbow-colorful playful Y2K
- ❌ purple-blue gradients
- ❌ emoji of any kind in the UI
- ❌ rounded everything / soft drop shadows

---

## Sources

User-provided collage references, sorted into `assets/refs/` after copying. No codebase, no Figma — references are mood/visual only.

| ref | what it taught us |
|---|---|
| `desktop-bliss-popup.jpg` | The XP "Bliss" wallpaper + Portuguese delete-confirmation popup. Source of the OS metaphor and `confirmação de delete` voice. |
| `coldculture-tv-menu.jpg` | PS2-style outfit selection on a CRT TV — pixel grid, scanlines, list with one highlighted row in piss-yellow. |
| `macos-rude-windows.jpg` | Multiple draggable windows stacked, blue chunky bitmap word "Rude" — the layered window manager mood. |
| `officeclub-poster.jpg` | OUTFIT CHECK box, mono caps, JP/RU system text, 18+ rave flyer typesetting. |
| `zenith-beam-poster.jpg` | Y2K chrome wordmark + JP kana + halftone stars. We use it for editorial poster moments. |
| `bsod-silhouette.png` | Person-shaped BSOD — silhouette filled with `0xF1534` text. Direct inspiration for our error popup color (`#1d2dc7`) and pixel font. |
| `blue-tile-bathroom.png`, `area-graffiti-sink.png` | Damp-tile teal palette — `--tile-deep`/`--tile-mid`/`--tile-bright`. |
| `fisheye-portrait.png`, `black-suit-streetlight.png`, `black-stairs.jpg`, `lounge-couch.jpg`, `photoshoot-studio.png`, `sony-camera-back.png` | The image vibe: night, low-light, B&W or heavily desat, fish-eye, surveillance/camera-back framing. |
| `nokia-8310-collage.jpg`, `nokia-6600-reality.jpg`, `honda-vtec-poster.jpg`, `mercedes-supersonic.jpg` | Y2K product-ad layouts — clean grids + one product hero + small spec list mono. We borrow the spec-list typography. |
| `grime-girls-flyer.jpg` | Bold display + barcode + ALL CAPS — the rare moment we go louder. |

---

## Index

```
README.md                    you are here
SKILL.md                     Claude / Agent SKILLS entrypoint
colors_and_type.css          all design tokens — colors, type, spacing, bevels
fonts/                       (empty — using Google Fonts substitutes; see CAVEATS)
assets/
  refs/                      copied user-provided reference imagery
preview/                     design-system cards (rendered into the DS tab)
  wordmark.html, voice.html
  color-soot|crt|tile|warm.html
  type-display|utility|pixel.html
  spacing.html, bevels.html, overlays.html
  buttons.html, window.html, error-popup.html, icons.html
  forms.html, tags.html, file-row.html, states.html
ui_kits/
  oncite-os/                 the desktop UI kit (primary surface)
    index.html               clickable demo
    Desktop.jsx              window manager + taskbar
    MusicPlayer.jsx          music.mp3
    Gallery.jsx              visuals/
    Memories.jsx             memories/
    About.jsx                about.txt
    Links.jsx                links.exe
    WindowChrome.jsx         shared <Window>, <Popup>
    os.css                   kit-local styles (depends on colors_and_type.css)
```

---

## Content fundamentals

### voice
- **lowercase always**, even at the start of sentences (except brand-quoted Portuguese / system strings)
- **short, fragmented**. one idea per line. line breaks instead of commas often.
- **no exclamation marks**. ever. periods only, or no punctuation.
- **no emoji** in any official surface. unicode arrows (`→ ↗ ↕ ←`), bullets (`•`), and box-drawing chars (`┃ ─ ▣ ▢`) are okay.
- **i / u** instead of "I" / "you" in lyrics-adjacent copy. "you" is fine in functional UI.
- **system-speak** is welcome — "file:", "// note 04 of 11", "0xf1534", "ln 18, col 14"
- **multilingual leak** — Portuguese (`confirmação de delete`, `sim/não`), Russian (`Алина`), Japanese kana for editorial flair. Don't translate everything.

### tone words
quiet · broken · slightly off · earnest · self-deprecating · technical · damp

### examples
| ✓ do | ✗ don't |
|---|---|
| `don't let myself destruct please let me` | `Hey gang!! Big news 🚨🔥` |
| `new track. 06.06. you'll know.` | `Click below to pre-save my AMAZING new single ✨` |
| `file: cerebral_aura_v3_FINAL_final.mp3 — 4.8 mb` | `My latest banger is finally here!!` |
| `the upload finally went through. ok.` | `So excited to share this with you all 💕` |
| `// note 04 of 11 — modified 04/12 03:41` | `Latest blog post · April 12 · 3 min read` |

---

## Visual foundations

### colors
Five families, all muted. See `preview/color-*.html` for swatches.

- **night & soot** (primary surfaces) — `#07080a → #3a3f48`. Never pure black; always slightly warm-gray.
- **dead crt** — `#0a1426 → #4a78c8` plus the BSOD `#1d2dc7`. Used for nighttime backdrops and system-error chrome.
- **damp tile** — `#0c1c1e → #3d7c80`. Bathroom teal. Used for secondary surfaces and the gallery cover.
- **warm / nostalgia** — `#d8d2c2` (bone, primary text), `#a39d8d` (bone-dim, secondary), `#8a3a1f` (rust, alerts), `#c14a2a` (rust-bright, hot button), `#b09a3c` (piss-yellow), `#4a5d3a` (moss).
- **bruise** `#3a2a4a` — single purple shadow accent.

### typography
- **display** — Archivo Black, `text-transform: lowercase`, `letter-spacing: -0.02em`. Headlines, wordmark.
- **sans** — Inter 400/500/600/700. UI body, button labels.
- **mono** — IBM Plex Mono. System labels, file names, captions, taskbar, status bars.
- **pixel** — VT323. Errors, BSOD, big timestamps. Reads as a dead 90s screen.
- **typewriter** — Special Elite. Memories, hand-written notes, lyric scraps.

Type rules:
- Lowercase always for display. Uppercase mono only at small sizes (10–12px) with `letter-spacing: 0.12–0.14em` for "system" labels.
- No more than 3 type families per layout.
- Mono is comfortable in the chrome; display + typewriter never share a line.

### spacing
8-step scale: 2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96. UI is dense (`16` is a normal gap). Editorial layouts breathe more (`64–96`).

### corners
Sharp by default. Most things are `radius: 0`. Buttons get 0–2px max. Pills exist but are rare (one-off tags only).

### borders, bevels, shadows
The system uses **OS-window bevels** (4-sided faux-3D borders) much more than soft drop shadows.
- `--bevel-out` → raised buttons, icons, taskbar items
- `--bevel-in` → pressed/inset state, input fields, progress bars
- Hard drop shadows: `4–6px solid #000` offset (no blur). Exclusive to windows and popups.
- Soft drop shadows: only used to lift floating editorial cards off photography. Heavy and offset.
- **1px hairlines** in `--line-1` for dividers. **Dashed borders** for ghost states / selected desktop icons.

### backgrounds
- Page bg: `--soot-900` (`#07080a`), almost always.
- Wallpaper bg: dim CRT-blue radial + vignette + 2px scanline overlay. Big lowercase wordmark dropped at 4% opacity in the corner.
- Photography is preferred over illustration. Imagery is **dark, low-light, B&W or heavily desaturated**. No bright colorful product shots. Fish-eye and surveillance-camera framings welcome.
- Repeating textures: scanlines (1px on / 2px off), dotted grain (3px), occasional CRT row interference (2-tone blue stripes).

### animation
- **No bouncy / spring easing.** The system feels broken; soft motion is wrong here.
- **Hard cuts** for window opens/closes (no fade).
- **2-frame "glitch"** on hover for display headlines: rust copy offset by `2px,1px` with `mix-blend-mode: screen`.
- Progress bars and the music seek are **stepped** (no smooth interpolation).
- Cursor blink for inputs is the only continuous animation.

### hover / press states
- Buttons hover: background lightens by one step in the soot scale.
- Buttons press: bevel inverts (`--bevel-out` → `--bevel-in`) and content shifts 1px down-right.
- Icons hover: get a 1px dashed bone-faint border + 5% bone wash background.
- Selected icon: rust 25% wash + dashed bone border.
- Links hover: rust → rust-bright, no underline change.

### transparency & blur
Sparingly. Blur is reserved for fog/photo treatments, not glassmorphism. The only blur in chrome is on the gallery viewer scrim (`rgba(7,8,10,0.92)`).

### layout rules
- **Fixed elements**: taskbar at bottom (32px), desktop icons top-left grid.
- **Windows are draggable, sharp, hard-shadowed**, never centered (intentional clutter).
- Editorial layouts mimic Y2K poster grids — small mono spec block in one corner, big imagery, one big lowercase headline, mono captions.
- One **rust** highlight per screen, max. It is the only color that fights to be seen.

---

## Iconography

### approach
oncite uses **CSS-drawn glyph icons** styled like old desktop OS icons — flat-shaded, beveled, in muted oncite colors. No Lucide, no Heroicons, no Tabler. The icons themselves are typographic glyphs (`♫ ▣ → i note`) inside a 56×56 beveled tile.

### what's available
- 5 desktop icons (`music.mp3 / visuals/ / memories/ / about.txt / links.exe`) — see `preview/icons.html` and `ui_kits/oncite-os/Desktop.jsx`
- 16×16 toolbar/menu icons can use bare unicode glyphs (`◀ ▶ ▮▮ × _ ▢ ↗ ↕ ✓ !`) — never colored.

### emoji
**No emoji.** Anywhere. Inside the UI, in copy, in captions. The reference materials use them in flyers ironically — that's the *world they react against*, not the system itself.

### unicode chars used as icons
`♫ ▣ ▢ ▮ ◀ ▶ ► ◄ × ✓ ✗ ⚠ ! → ↗ ↕ ← • · ─ ┃ @ #`. Treat these as part of the system.

### asset substitutions (CAVEATS)
- The user provided no logo files. The wordmark in `preview/wordmark.html` is an **Archivo Black** rendition — needs a real logo if one exists.
- No icon SVGs were provided. The OS desktop icons are CSS-drawn placeholders. Real icons should be provided as 64×64 PNGs (or SVG) in `assets/icons/`.

---

## Font substitutions ⚠️

We did not have access to original font files for the brand. All fonts in this system are **Google Fonts substitutes** chosen to match the visual reference. **Please provide the real fonts (.ttf / .woff2) and confirm/swap.**

| role | substitute (in use) | what we'd guess the real one is |
|---|---|---|
| display | **Archivo Black** | A heavy condensed grotesk — *Druk*, *Helvetica Inserat*, or a Y2K-y *Eurostile Black* |
| sans (UI body) | **Inter** | *Helvetica Neue*, *Suisse Int'l*, or *Aktiv Grotesk* |
| mono (chrome) | **IBM Plex Mono** | *PP Neue Machina Mono* or stock *Courier New* |
| pixel (errors) | **VT323** | *MS Sans Serif Bold* / *Tahoma 8pt* or a true Win98 bitmap |
| typewriter (notes) | **Special Elite** | *American Typewriter* or any worn typewriter face |

If you have alternate font files, drop them in `fonts/` and update the `@import` in `colors_and_type.css`.

---

## CAVEATS / open questions

- **No logo files provided** — wordmark is type-rendered. If a custom mark exists, please attach.
- **All fonts are Google Fonts substitutes** (see table above).
- **Only one UI surface was built** (`oncite-os`). If there's also a separate marketing site, EPK, merch shop, or mobile experience to design for, we'd build kits for those next.
- **No real audio / video / photography** is included — gallery uses reference imagery as placeholders.
- **No slide template** was provided, so no `slides/` directory was created.

---

## Iterate with me

The biggest wins from here would be:
1. **Real fonts.** Will materially change how loud or quiet the system reads.
2. **Real photography** — at least 6–10 shots in the oncite mood (low light, fish-eye, B&W, etc.) to replace placeholders.
3. **Logo/wordmark file** if there's a custom one.
4. **One more UI surface** — probably an actual marketing page or single-link page (`oncite.fm/links`). Tell me which.
5. A **merch / poster** template using the editorial-y2k-ad mood (the Honda VTEC / Nokia / Office Club references).
