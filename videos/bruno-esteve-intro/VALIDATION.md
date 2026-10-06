# Validation

- Portfolio `npm run lint`: passed.
- Portfolio `npm run build`: passed.
- HyperFrames 0.8.138 `check`: passed, zero errors.
- Runtime, layout and contrast audits: passed.
- Motion assertions: passed, 300 sampled states.
- Scene snapshots and explosion/glitch boundaries: visually inspected.
- Actual encoded MP4: extracted and inspected ten proof frames.
- Small and large review sizes: full-resolution frames and scaled contact sheet inspected.
- Original website files: no changes.
- Final output: H.264, yuv420p, 1080 × 1350, 30 fps, 600 frames, 20.000 seconds.
- Audio: none, consistent with the brief's optional audio.

Non-blocking lint notices were reviewed: five recommendations to split scene
wrappers into sub-compositions, and one conservative callback measurement
warning. The composition deliberately shares the typography bitmap across the
pillar/particle handoff. All DOM measurements occur once before registration;
the playback callbacks only repaint canvas from fixed tables and timeline time.
There are no runtime, layout, motion or contrast warnings.

The numbered scene names in the storyboard correspond to DOM IDs with a
`scene-` prefix, for example `scene-01-intro`.
