<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project instructions

## Product

This repository contains Bruno Esteve's personal portfolio. It should present him
as a hybrid profile connecting business, data, AI, technology, design, and
creative communication.

The intended experience is editorial, precise, contemporary,  distinctive and tech.
Projects are case studies with a clear narrative, not a grid of generic cards.
Prioritize real content, typography, composition, imagery, and clarity over
decoration. Avoid developer-portfolio clichés, SaaS-dashboard aesthetics, and
anything that looks like an unedited AI template.

The verified product and content source of truth is `PRODUCT.md`. The approved
visual source of truth is `DESIGN.md`. The broader workflow brief lives in
`guia-portfolio-web-con-codex.md`. Treat the workflow brief as context, but follow
`PRODUCT.md`, `DESIGN.md`, and this file when documents differ.

## Stack and package policy

- Next.js App Router, React, and strict TypeScript.
- Tailwind CSS for styling.
- Prefer Server Components. Add `"use client"` only for interaction, state, or
  browser APIs that genuinely require it.
- Use `next/image` for portfolio imagery and `next/font` for web fonts.
- Use npm and keep `package-lock.json` in sync. On Windows PowerShell, use
  `npm.cmd` if the script execution policy blocks `npm`.
- Do not add a production dependency unless the requested feature needs it.
  Explain the purpose and trade-off in the handoff.
- Do not add GSAP, Lenis, Three.js, React Three Fiber, a CMS, a database, or a
  general-purpose component kit without an explicit product need.
- Never commit secrets, credentials, private keys, local environment files, or
  generated build artifacts.

## Skill routing

Use the smallest relevant skill set for each task. Read a selected skill's full
`SKILL.md` before applying it. Do not invoke every design skill by default.

- `design-taste-frontend`: creative direction and high-impact editorial
  composition; use before building or substantially redesigning major sections.
- `ui-ux-pro-max`: design tokens, typography, layout, responsive behavior,
  interaction rules, and accessibility.
- `frontend-design`: implement an approved visual direction in production UI.
- `vercel-composition-patterns`: component APIs, composition, and refactors that
  prevent monolithic components or boolean-prop proliferation.
- `vercel-react-best-practices`: React and Next.js architecture, rendering,
  data loading, bundle size, and performance.
- `web-design-guidelines`: objective UI, UX, interaction, and accessibility
  review after completing a section or page.
- `impeccable`: critique and bounded late-stage refinement after the visual
  language and structure are stable. Do not let it silently redesign the site.

Typical sequence for new visual work:

1. Establish the brief and direction with `design-taste-frontend`.
2. Turn it into system rules with `ui-ux-pro-max`.
3. Implement with `frontend-design` and the Vercel architecture skills.
4. Audit the completed scope with `web-design-guidelines`.
5. Use `impeccable` only for a final, bounded polish pass.

## Design rules

- Prefer a strong editorial grid and intentional asymmetry over collections of
  rounded cards.
- Let hierarchy, spacing, type, and imagery carry the identity.
- Avoid gratuitous gradients, glassmorphism, heavy shadows, decorative 3D,
  excessive rounded containers, and animation without narrative purpose.
- Keep functional icons scarce and consistent.
- Reuse established color, type, spacing, radius, and motion tokens.
- Make every interaction usable without hover and preserve visible focus states.
- Respect `prefers-reduced-motion`.
- Design mobile and desktop together; do not treat mobile as a later reduction.

## Architecture and content

- Keep content and data separate from presentation.
- Store project summaries in typed data. Use MDX only when long-form case studies
  benefit from component-rich editorial content.
- Prefer small, composable primitives and isolated page sections over large page
  components with many flags.
- Reuse existing primitives before creating variants.
- Avoid `any`; if unavoidable, document why locally.
- Use semantic HTML, a logical heading hierarchy, meaningful alt text, and
  stable image dimensions.
- Optimize committed imagery as AVIF or WebP when practical; do not add
  unnecessarily large source files.

## Codex workflow

1. Inspect the relevant files, repository status, and existing visual system.
2. Restate the requested scope internally and identify constraints. Ask a
   question only when a missing decision would materially change the result.
3. For ambiguous visual work, state a short design direction and assumptions
   before implementation.
4. Change only the requested section or behavior and preserve unrelated work.
5. Check responsive behavior, keyboard interaction, focus states, semantics,
   contrast, reduced motion, and layout stability as applicable.
6. Run the narrowest useful checks during iteration, then the required final
   validation.
7. Review the diff for regressions, accidental generated files, secrets, and
   unrelated changes.
8. In the handoff, lead with the result and list validation performed plus any
   remaining risk.

## Required validation

After relevant code changes, run:

- `npm run lint`
- `npm run build`

Also test the affected experience at small and large viewport widths. A task is
done only when the requested behavior works, the established design system is
preserved, validation passes or failures are clearly explained, and no unrelated
files were changed.
