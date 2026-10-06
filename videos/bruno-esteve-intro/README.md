# Bruno Esteve — portfolio introduction

Editable HyperFrames project. 20 seconds, 1080 × 1350, 30 fps, MP4/H.264.
The portfolio application is not modified.

```sh
npm run dev
npm run check
npm run render -- --quality delivery --fps 30 --output renders/bruno-esteve-linkedin.mp4
```

Requires Node.js 22+, FFmpeg and the HyperFrames rendering browser.
All assets are local: Bricolage Grotesque Latin variable font from the
portfolio's Next.js cache, original public/icon.svg, and GSAP 3.15.
No production dependencies were added to the website.

`user_script.txt` preserves the request. `BRIEF.md`, `frame.md` and
`STORYBOARD.md` describe the brief, visual system and scene timings.
The original registry components in `compositions/components` are donors:
their deterministic algorithms are adapted in `index.html` to the requested
timing, palette, SVG particle mask and typography.

Frame IDs: 01-intro, 02-access, 03-pillars, 04-particles, 05-enjoy.
This first version is silent.
