# Portfolio (Vite + React + Tailwind)

A cinematic, animated portfolio for Jaymin Dattani built with Vite, React, Tailwind CSS, and Framer Motion/AOS-inspired scroll reveals.

## Features

- Typewriter hero with cinematic glows
- Sticky blurred nav with smooth scroll and accessible skip link
- How I Work, Projects, Skills, Experience sections with motion
- Testimonials component implemented (usage disabled until data ready)
- Contact section with copy-to-clipboard and mailto form
- Polished Footer with quick links
- ESLint + Prettier, Vitest + Testing Library (jsdom)

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm run test` — run tests

## Local development

```cmd
cd /d d:\WORK\Portfolio
npm install
npm run dev
```

## Enable Testimonials later

- Add quotes to `src/data/testimonials.js`
- Un-comment the import and usage in `src/App.jsx` (look for the instruction comment)

## Accessibility

- Skip link to main content (`#main`)
- Focus-visible outlines for interactive elements

## Notes

- The contact form uses `mailto:` to open your email client. To use a real submission flow, connect EmailJS, Formspree, or a serverless endpoint.
