# Bruno Esteve — portfolio introduction v3

Current editable composition: 19.5 seconds, 1080 × 1350, 30 fps. Four scenes: promise and name, three project results, particles and original logo, web button → cursor click → ENJOY ;). Existing 18-second MP4s predate the latest edits.

## Review and render

```sh
npm run dev
npm run check -- --strict
npm run render -- --quality delivery --fps 30 --output renders/bruno-esteve-linkedin-v3.mp4
```

Studio: http://localhost:3017/#project/bruno-esteve-intro

Node.js 22+, FFmpeg and HyperFrames 0.8.141. The current export uses screenshot capture and two workers to avoid the earlier capture-path failure. No website dependency was added.

## Project result images

Standalone PNG and scalable SVG images are under assets/value-images/: aepd-value, nextplan-value and alina-value. Each illustrates a simplified application result, with an explicit recreation/illustrative-data label. Interface SVGs retain named animation groups for the forecast, recommendation, save confirmation, match and preparation. These are source-grounded recreations, not confidential screenshots. Exact content and score calculations: assets/value-images/CONTENT.md.

## Sound and continuity

Seven local cues accompany semantic actions. NextPlan changes its label and check at the save click. The current sound revision uses seven distinct effects; cue choices, timing, source edits and gain are in AUDIO.md. The last project is carried into the dissolve; the formed logo is carried into the outro without a cut in its position or scale. The logo leads directly to the web button; its click at 16.45 s triggers the transformation into ENJOY ;), held for about 1.56 s. The narrative remains complete with sound muted.

Original v1 and v2 MP4s remain separate. Superseded screenshots, discarded scenes, unused registry samples, an unused sound and the generated preview sheet were removed after checking the active compositions. Earlier committed sources remain recoverable from Git history. Final result images and editable interface SVGs are retained. BRIEF.md, frame.md, STORYBOARD.md, VALIDATION.md and assets/SOURCES.md document the edit.

## Latest closing and sound edits · not exported

The composition uses distinct action-specific sound cues and a direct logo → web button → click → ENJOY closing. Explora mis proyectos has been removed. Existing MP4s have not been regenerated and contain neither these sound changes nor the new closing. Review the editable Studio preview.
