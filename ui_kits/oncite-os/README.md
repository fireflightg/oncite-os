# oncite OS — UI kit

This is the primary surface of the oncite design system: a fictional dark, slightly-broken desktop OS that lives at oncite.fm. It's a single-page interactive prototype where the visitor explores the artist's world by clicking icons (music.mp3, visuals/, memories/, about.txt, links.exe).

## Files
- `index.html` — bootstrap, loads React + Babel, wires everything up
- `Desktop.jsx` — wallpaper, icon grid, taskbar, window manager
- `MusicPlayer.jsx` — windowed media player with tracklist
- `Gallery.jsx` — file-explorer style image viewer
- `Memories.jsx` — typewriter notes window
- `About.jsx` — raw .txt window
- `Links.jsx` — small links popup
- `WindowChrome.jsx` — shared window frame + popup primitives

## Components reused from system
- Bevels, titlebars, popups, buttons all use `colors_and_type.css` tokens
- Icons are CSS-drawn glyphs in oncite's muted palette (no emoji, no rainbow)
