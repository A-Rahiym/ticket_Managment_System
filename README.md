# Ticket Management System (Vue + Vite)

A lightweight, client-side Ticket Management System built with Vue 3, Vite and TypeScript. This repository provides a small demo app with authentication (mocked), ticket CRUD (mocked), a dashboard, and a set of reusable UI components and stores (Pinia). It is intended as a front-end template / prototype that can be wired to a real backend.

## Quick summary

- Framework: Vue 3 (Composition API)
- Bundler: Vite
- Language: TypeScript
- State management: Pinia
- Routing: Vue Router
- Styling: Tailwind (configured via PostCSS)
- Mock API: Lightweight mock functions in `src/mock` (no server required)

## Project structure

Top-level files

- `package.json` — scripts and dependencies
- `vite.config.ts` — Vite configuration and path alias (`@` -> `src`)
- `tsconfig.json`, `tsconfig.app.json` — TypeScript settings

src/

- `App.vue` — application root (mounts router + global layout)
- `main.ts` — app bootstrap (Pinia, Router, Toast plugin)
- `style.css` — global styles and Tailwind entry
- `router/` — route definitions (`src/router/index.ts`)
- `routes/` — page-level routes (landing, auth, dashboard, tickets)
- `components/` — shared components (Navbar, ProtectedRoute, UI primitives)
- `mock/` — mock data & API functions
  - `mock.ts` — initial ticket data and feature metadata
  - `mockApi.ts` — mocked async functions: login, signup, create/update/delete tickets
- `store/` — Pinia stores used by the app
  - `auth.ts` — session handling (uses localStorage `ticketapp_session`)
  - `ticket.ts` — ticket list and CRUD wrappers that call mockApi functions
- `types/` — TypeScript types (e.g., `Ticket`)

## What the app demonstrates

- Protected routes and a small auth flow (mocked)
- Ticket list with create/update/delete (mocked server delay)
- Toast notifications and reactive Pinia stores
- Component-driven UI (reusable base inputs, buttons, modals)

## Prerequisites

- Node.js (see `package.json` engines): recommended Node >= 20 (this project lists `node: ^20.19.0 || >=22.12.0`).
- npm (or yarn / pnpm) installed.
- Git (to clone the repo)

## Install & run locally

Open a terminal in the repo root and run:

```bash
# install dependencies
npm install

# dev server (Vite)
npm run dev
```

Notes:

- Vite's dev server runs on port 5173 by default. To expose it on the network (for testing on other devices) use:

```bash
npm run dev -- --host
```

- Build for production:

```bash
npm run build

# preview the production build locally
npm run preview
```

## Scripts (high level)

- `npm run dev` — start Vite dev server
- `npm run build` — type-check and build (uses `vue-tsc` + `vite build`)
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint (`--fix`) across the project
- `npm run format` — run Prettier over `src/`

## How auth & data work (important internals)

- Auth is mocked in `src/mock/mockApi.ts` via `mockLogin` and `mockSignup`. On success a token + user object is returned and saved to `localStorage` under `ticketapp_session` by the Pinia `auth` store.
- Tickets are initialized from `src/mock/mock.ts` (`initialTickets`) and mutated via `createTicket`, `updateTicket`, and `deleteTicket` in `mockApi`. These functions simulate network delay with a short timeout.

This means the app is fully usable offline and requires no backend to explore UI/UX and state flows. To connect a real backend, replace the mock functions with real API calls and update the store actions accordingly.

## Deploying online

This is a static front-end app after building. Common deployment options:

- Vercel / Netlify: Connect the repo and set build command to `npm run build` and output directory to `dist`.
- Static hosts (Nginx, GitHub Pages): Build with `npm run build` and serve the `dist/` folder.

If your backend requires client-side environment variables, add them to a `.env` file and reference via `import.meta.env.VITE_*` (Vite requires `VITE_` prefix for exposed vars).

## Notes & necessities

- No database or backend is bundled — this is a front-end demo using in-repo mock functions.
- Session is persisted in `localStorage` (key `ticketapp_session`) — clear this to reset the demo session.
- TypeScript is enabled; a type-check is run during `build` via `vue-tsc`.

## Recommended next steps (when converting to production)

1. Replace mock API functions with real HTTP calls (Axios / fetch) and implement authentication + server-side session / token validation.
2. Add environment variable handling for API base URL, keys, etc. (use Vite `VITE_` prefixed vars).
3. Add CI (GitHub Actions) to run `npm run lint`, `npm run type-check`, and `npm run build` on PRs.
4. Add unit tests (Vitest / Jest) for critical stores and components.
## Credits
Built as a front-end demo project showcasing Vue 3 + Vite + Pinia.