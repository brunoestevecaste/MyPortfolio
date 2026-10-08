# Validation · v2 · 8 October 2026

- Portfolio `npm run lint`: passed.
- Portfolio `npm run build`: passed.
- HyperFrames CLI upgraded 0.8.138 → 0.8.141; original composition checked successfully before editing.
- Revised composition: zero lint/runtime/motion/contrast errors or warnings. 15 layout samples plus motion assertions.
- Final typography parity correction checked again.
- Actual encoded MP4 inspected as a 36-frame contact sheet plus full-resolution pillar and 360 px closing frames.
- First frame has a complete hook. All three public demo scenes render. Logo formation and final CTA remain visible.
- Sources: actual captures of the existing public portfolio demos, with illustrative-data notice onscreen.
- Sound: 12 timed SFX clips using 3 frozen bundled assets; AAC stream verified at 48 kHz. Measured encoded peak −9.6 dBFS, no clipping. No voice/music.
- Export: H.264/yuv420p, 1080 × 1350, 30 fps, 540 frames, 18.000 seconds, about 7.6 MB.
- Output: `renders/bruno-esteve-linkedin-v2.mp4`; original silent output retained.
- Preview: managed background server on port 3017, HTTP 200 verified.
- Diff: only this video project edited by this turn. Pre-existing/concurrent website work preserved.
- No new website production dependencies. Local WebP screenshots total about 228 KB.

One informational layout event was reviewed: the name and closing symbol
briefly cross during the deliberate transform at 2.88 s. It is confined to the
transition, with no held overlap.

## Render workaround

The default hardware fast-capture run failed its small-frame verification,
then stalled after falling back to sequential screenshots (frame 153/540).
The complete export succeeded using two screenshot workers and software GPU:
`--workers 2 --experimental-fast-capture=false --no-browser-gpu`. These options
are recorded in the render script for repeatable future exports. Final render
took about 15.5 seconds and captured all 540 frames.

## Usage query

HyperFrames usage returned `status: unknown`, `reason: usage_request_failed`.
No quota or cost estimate is inferred; this was a local render.


# Validation · v3 · 8 October 2026

- Scope: only this video project changed in this revision; concurrent portfolio/lab changes were preserved.
- Portfolio `npm run lint` and `npm run build`: passed during this revision. No Next.js UI code or production dependencies were changed.
- HyperFrames 0.8.141 final strict check: passed; zero errors/warnings in lint, runtime, layout, motion and contrast. 23 selected layout frames, 300 motion samples, 22/22 contrast checks.
- Temporal assertions cover the recommendation/save and match/letter/interview order. Explicit initial opacity prevents a pre-reveal flash found in the first encoded draft.
- Entry/exit overflow is declared only on the two traveling project panels and their moving text. The closing symbol intentionally disappears behind the expanding interface panel. Five outgoing particle-scene text blocks declare their deliberate layering under the transparent particle canvas; full-frame snapshots show that the canvas does not conceal them before their fade. No root-level audit suppression.
- Visual checks: transition snapshots, 36 actual encoded MP4 frames, full-resolution scenes and 360 × 450 encoded mobile view. Three standalone application recreations also inspected at 1080 × 1350 and 360 × 450.
- Pixel continuity: settled Alina → carried project at 11 s is identical; formed logo → next scene at 14 s differs only by subpixel capture rounding. The final CTA remains static and legible through the last frame.
- Content: hourly forecast comparison, personalized recommendation/save, and explainable skill match with verified letter/interview preparation. All examples visibly identified as recreations with illustrative data. Alina's 80% follows the documented 5 full + 2 partial + 1 missing skill example and 5-point bonus, not hiring probability.
- Sound: seven frozen local SFX with gains tied to transitions, save confirmation, logo landing and domain reveal. Encoded mono audio is byte-identical to the onset-checked draft; onset offsets reflect each source asset's attack (about 33–79 ms). Save confirmation occurs at 6.967 s, immediately after the measured click attack at 6.940 s. No voice/music. Final encoded stereo mean −24.6 dBFS and peak −10.9 dBFS; no clipping.
- Final export: H.264/yuv420p, 1080 × 1350, 30 fps, 540 frames, 18.000 s; AAC stereo 48 kHz, 18.000 s; 5,160,485 bytes. Screenshot/software-GPU export with two workers completed in 14.3 s.
- Output: `renders/bruno-esteve-linkedin-v3.mp4`. Original v1/v2 retained.
- Editable/source assets: three interface SVGs, three standalone PNG/SVG result images, and one preview sheet. Registry donors and the unused pillar scene retained as `.html.txt` references so Studio lists only the current renderable scenes. Waveform cache ignored; no generated renders committed.
- HyperFrames usage remains unavailable (`status: unknown`, `reason: usage_request_failed`); no cost/quota estimate inferred.
- The skill-required anonymous feedback submission was rejected by automatic approval review because its external destination and project-derived payload were not explicitly authorized. No report or project file was transmitted, and no bypass/retry was attempted. This does not affect the local deliverables.


# Sound variation validation · 8 October 2026 · no export

- Four audio clips revised; visuals, scene timing, original audio ids and unrelated human edits preserved.
- Seven placed cues now reference seven different source recordings. The resolved generic whoosh alias was found to be the same recording as the intro; unused aliases created during this revision were discarded and replaced with a shortened cinematic-source excerpt.
- All audio files decode and source ranges are valid. Pop attack matches the save confirmation at 6.967 s; the ping skips its quiet lead-in and accompanies the compatibility reveal.
- Source/mix diagnostic mono peak −7.91 dBFS; no clipping. This measurement is from decoded sources at authored gains, not a video export.
- HyperFrames 0.8.141 strict check passed with zero errors/warnings across lint, runtime, layout, motion and contrast.
- Studio live timeline displays the revised cue labels and timings; sound is unmuted.
- No render/export command was run. Existing v3 MP4 checksum and modification time verified unchanged.
- Usage query remains unknown; no allowance/cost estimate inferred. No external feedback submission attempted.

- Final repository `npm run lint` and `npm run build`: passed. `git diff --check` passed. Review against the turn-start source confirms only four audio elements changed in index.html; no visual scene source changed during this sound revision.


# Current closing validation · 8 October 2026 · no export

- Latest instruction implemented: remove the explore page. Four active scenes now total 19.5 s; closing clip runs 14–19.5 s, logo → website button → cursor click → ENJOY ;).
- First 14 s and the user’s current intro text preserved. Archived explore source is a non-renderable text reference; active composition HTML contains no Explora text.
- HyperFrames 0.8.141 strict check passed: zero errors/warnings across lint, runtime, layout, motion and contrast; 15 selected layout frames, 300 motion samples, 12/12 contrast checks. Boundary appearance assertion permits the checker’s first sample after 14 s (14.022 s); exact-boundary snapshots already show the logo.
- Eleven full-frame snapshots inspected, plus a 360 px-wide three-state closing sheet. Full-scale formed-logo handoff has only negligible one-channel subpixel rounding (mean difference below 0.00005/255), with matching geometry. Final ENJOY at 18.2 and 19.47 s is pixel-identical.
- Cursor arrives on the button, dwells before pressing, and shares the contact origin/compression with the button; it exits before the text transform. Website label is readable before the click. Keyframes JSON inspected; real snapshots used to validate the nested composition rather than helper onion overlays.
- UI click source placement 16.4018 s + measured 0.0482 s attack offset = 16.45 s, matching the start of compression. Seven distinct cue assets retained, with no added repeat or music.
- Studio live preview confirmed four active scenes, Web · clic · ENJOY at 14–19.5 s, volume 100%, unmuted; left at 16.2 s for review.
- Portfolio npm run lint and npm run build passed during this closing revision; no portfolio source was edited by this task. git diff --check passed.
- No video render/export command was run. Existing v3 MP4 SHA-256 f1fb324c0f7e0aa8f60fa8bec4d03a53f40c46c60cc2bd01b46074e316f44247 and modification timestamp are unchanged.
- Usage query unavailable (usage_request_failed); no quota/cost estimate inferred. No external feedback transmission attempted.


# Repository cleanup · 8 October 2026

The active root composition and all four mounted scenes were checked before removal. Superseded v2 screenshots, two discarded scenes, five unused registry samples, unused sfx_004.wav and the generated project-results-preview.png are no longer retained. Registry metadata and the media ledger now contain only retained resources. Final standalone result images and editable interface SVGs remain available. Historical validation notes above describe their original revisions. No video was exported during this cleanup.

Current verification for the commit grouping: portfolio lint and production build passed; Home and lab/hero checked at 375 px and 1440 px, including keyboard activation, all ten proposals, pause, offscreen visibility and reduced motion, with no browser errors or horizontal overflow. HyperFrames 0.8.141 strict check passed across eight selected timestamps with zero errors/warnings and 15/15 contrast checks. All active asset paths and retained media-ledger entries resolve. Diff whitespace and common credential-pattern checks passed.
