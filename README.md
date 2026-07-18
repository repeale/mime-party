# 🎭 Mime Party

**Play now: [repeale.github.io/mime-game](https://repeale.github.io/mime-game/)**

A fast, silly charades/mime party game — built as a static React + TypeScript web app, optimized for mobile.

Pass one phone around: pick categories and a difficulty, then take turns acting out words while your team guesses before the clock runs out. No sign-up, no ads, no accounts — just open it and play.

## Features

- 8 categories (Animals, Actions, Movies & TV, Jobs, Emotions, Sports, Kids & Cartoons, Objects), 400+ words tagged by difficulty
- English and Italian, with more languages easy to add (`src/i18n/`)
- Easy / Medium / Hard / Mixed difficulty, and 45s–120s round lengths
- Swipe-to-answer card (or tap the buttons) with spring animations
- Countdown ring timer with urgency cues in the final 10 seconds
- Synthesized sound effects (no audio files) + haptic feedback, both toggleable
- Confetti + best-score tracking (saved locally on the device)
- Mobile-first layout with safe-area support for notches/home indicators

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## Tech stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) for styling
- [Framer Motion](https://motion.dev) for animation and drag gestures
- [canvas-confetti](https://github.com/catdad/canvas-confetti) for the results screen celebration

## Deploying

Live at **[repeale.github.io/mime-game](https://repeale.github.io/mime-game/)**, deployed automatically by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main` (build → `actions/upload-pages-artifact` → `actions/deploy-pages`). Trigger a manual redeploy anytime from the Actions tab (`workflow_dispatch`).

It's a plain static site otherwise — `npm run build` outputs a `dist/` folder you can host anywhere (Netlify, Vercel, Cloudflare Pages, S3, etc). `vite.config.ts` uses relative asset paths (`base: './'`) so it works from any subpath.
