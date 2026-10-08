# Sound variation · 8 October 2026

Current composition is updated; no video was exported for this revision. Existing MP4 files predate these sound changes.

Seven cues use seven distinct local source assets. The first 14 seconds retain their timing; the closing now runs from 14 to 19.5 seconds. Names/ids retained for stable editor references; Studio labels describe the revised action.

| Moment | Effect | Start | Source | Gain |
| --- | --- | ---: | --- | ---: |
| Symbol moves into the interface | Short airy whoosh | 2.2000 | sfx_002.mp3 | 0.26 |
| NextPlan enters | Short cinematic sweep, different recording | 5.6667 | sfx_010.wav | 0.22 |
| Plan becomes saved | Soft pop | 6.8500 | sfx_006.mp3 | 0.27 |
| Skill match appears | Electronic ping | 8.5733 | sfx_007.mp3 | 0.25 |
| Particles converge | Light sparkle texture | 11.1800 | sfx_008.mp3 | 0.16 |
| Logo forms | Bass impact | 12.9000 | sfx_003.mp3 | 0.30 |
| Cursor presses web button | Soft UI click | 16.4018 | sfx_001.mp3 | 0.25 |

All paths are under `.media/audio/sfx/`. The ping skips 0.25 s of source lead-in and plays 1.07 s. The pop's measured attack is at 6.967 s, matching the save confirmation at 6.967 s. Sparkle has its own track so its short tail can meet the logo hit without a track collision.

The new sweep is a frozen excerpt of the bundled `whoosh-cinematic.mp3`: source 2.0–3.4 s, pitch-preserving 2.5× tempo, 20 ms source entrance / 120 ms source tail boundary fades, 0.564396 s output. This avoids the bundled whoosh/short-whoosh aliases, which contain the same recording. Source preprocessing is fixed in the file; timeline mixing uses `data-volume`.

Validation: all clips decode; each has a unique source checksum and valid source window; diagnostic mono summation peak −7.91 dBFS, no clipping. This is source/mix analysis, not an encoded-export measurement. HyperFrames strict check passes with no errors or warnings. No new voice or music.

Closing synchronization: the source click has a measured 0.0482 s attack offset, so placement at 16.4018 s puts its attack at 16.45 s, exactly when the cursor and button compress. The click is heard once, before the button-to-ENJOY transform.
