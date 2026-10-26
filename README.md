# Portfolio

A personal portfolio for Bianca Datulayta, built with React, React Router and GSAP. It has a hero with touchable flowers, a scroll-driven title animation, an about section, a project index with hover previews of my Q1 React/GSAP mini-projects, a contact section and a footer.

![Portfolio screenshot](./public/screenshot.png)

**Live site:** REPLACE: https://your-name.vercel.app

## Tech stack

- React 18 (Vite)
- React Router 6 (single page today, structured for more routes)
- GSAP 3 with ScrollTrigger and `@gsap/react`
- Plain CSS with custom properties, mobile-first

## Features

- Hero: flowers pop in, the name rises letter by letter, and touching a flower makes it spin (GSAP)
- Scroll-scrubbed "Frontend Developer" text that slides in from both sides over a rising disc (GSAP ScrollTrigger)
- Project index: hovering a row shows a floating screenshot that follows the cursor and tilts; touch devices show the screenshot inline
- Contact: endless marquee, optional CV download, and Email, GitHub and LinkedIn links
- Reduced-motion supported, responsive from 320px up, keyboard accessible with a skip link and visible focus states

## Project structure

```
src/
  components/   Hero, CrossText, About, Projects, ProjectCard, Contact, Footer, Navbar, Flower, Layout
  pages/        Home, NotFound
  data/         content.js (all text, links and project data)
  index.css     Styles
```

## Setup

```bash
git clone https://github.com/biancadatulayta-gif/Datulayta.git
cd Datulayta
npm install
npm run dev
```

Other scripts:

```bash
npm run build     # production build in /dist
npm run preview   # preview the production build
npm run check     # fail if placeholder text is left in the project
```

## Editing content

Everything personal lives in `src/data/content.js`. Project screenshots go in `public/projects/`. To show the "Download CV" block, put your PDF in `public/` and set `cv` in `content.js`.

## Deployment

Deployed on Vercel. `vercel.json` rewrites all routes to `index.html` so React Router works on refresh. For Netlify, `public/_redirects` does the same.
