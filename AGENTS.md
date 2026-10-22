# AGENTS.md — Portfolio v2 Frontend

Instructions and context for AI agents (opencode, Cursor, etc.) working on this repository.

## Project Overview

Personal portfolio site for **Meach Senbroseth (Seth)**, a full-stack developer in Phnom Penh, Cambodia. Built with **Nuxt 4** and styled with a custom "brutalist / terminal / HUD" design system (monospace font, sharp corners, black `#131313` + off-white `#fafafa` + green accent `#28c840`, uppercase tracking-widest micro-labels like `// MODULE`, `STDOUT.LOG`, `SYS_UID_001`).

The site is a **frontend-only** repo. All content (projects, experience, education, auth) comes from an external **Laravel REST API** configured via `NUXT_PUBLIC_API_BASE` (`.env`).

Live site: https://msbseth.com

## Tech Stack

- **Nuxt 4** (`nuxt ^4.4.2`), Vue 3 (`<script setup>`), Vue Router 5
- **Pinia** for state (stores in `app/stores/`, plain `.js`)
- **Tailwind CSS v4** via `@nuxtjs/tailwindcss` (CSS-first config in `app/assets/css/tailwind.css`)
- **shadcn-vue** (`shadcn-nuxt`) — components in `app/components/ui/`, prefix `''`, new-york style, lucide icons
- **Reka UI** (Radix foundation)
- **lucide-vue-next** + **@nuxt/icon** (icon sets: `simple-icons:*`, `ph:*`, `mdi:*`, `lucide:*`)
- **Swiper** for the infinite tech-stack marquee on the home page
- **@nuxtjs/sitemap**, **@nuxtjs/robots**, **@nuxt/fonts**, Google Analytics (hardcoded gtag id `G-1DNM65TRNT` in `nuxt.config.ts`)
- **@vueuse/core** (`provideSSRWidth(1024)` in `app/plugins/ssr-width.ts`)

## Commands

```bash
npm install          # install deps (runs nuxt prepare postinstall)
npm run dev          # dev server → http://localhost:3000
npm run build        # production build
npm run generate     # static generation
npm run preview      # preview production build
```

There is **no lint or typecheck script** in `package.json`. Verify with `npx nuxt build` / `npx nuxi typecheck` if needed.

## Environment (.env)

Copy `.env.example` → `.env`. All vars are read via `useRuntimeConfig().public`:

| Var | Purpose |
| --- | --- |
| `NUXT_PUBLIC_SITE_URL` | Site URL (default `https://msbseth.com`) |
| `NUXT_PUBLIC_API_BASE` | Laravel API base URL, e.g. `https://api.msbseth.com/api`. **If empty, project fetching is disabled and public pages render empty states.** |
| `PUBLIC_CONTACT_EMAIL` | Contact email for mailto link |
| `PUBLIC_GITHUB_URL` / `PUBLIC_LINKEDIN_URL` / `PUBLIC_TELEGRAM_URL` / `PUBLIC_YOUTUBE_URL` | Social links |

`.env` is gitignored — never commit real secrets.

## Project Structure

```
app/
├── assets/
│   ├── css/main.css           # global font (Google Sans Code) + body
│   └── css/tailwind.css       # Tailwind v4 + shadcn theme vars (oklch tokens)
├── components/
│   ├── Navbar.vue             # public nav (default layout)
│   ├── FooterComponent.vue    # socials footer
│   ├── AdminSidebar.vue       # admin sidebar (shadcn sidebar + dropdown)
│   ├── BackgroundLogsSection.vue  # experience + education timelines (about page)
│   ├── Backgroundlogsskeleton.vue # skeleton fallback
│   └── ui/                    # shadcn-vue components (button, dialog, table, sidebar, ...)
├── composables/
│   └── useSEO.ts              # useSEO(), useSiteUrl(), createBreadcrumbSchema(), createWebsiteSchema(), createProjectSchema()
├── layouts/
│   ├── default.vue            # Navbar + Footer + page transitions
│   └── admin-layout.vue       # SidebarProvider + AdminSidebar, requires auth
├── lib/
│   └── utils.ts               # cn() (clsx + tailwind-merge)
├── middleware/
│   ├── admin.js               # /admin routes → require auth + is_admin
│   └── auth.js                # /admin auth guard (used by admin pages)
├── pages/
│   ├── index.vue              # home: split hero + quote typewriter + tech marquee + contact
│   ├── about.vue              # bio hero + BackgroundLogsSection (experience/education)
│   ├── projects/
│   │   ├── index.vue          # project grid, skeleton + empty states
│   │   └── [slug].vue         # project detail, lightbox gallery
│   └── admin/
│       ├── index.vue          # dashboard placeholder ("admin dashbord")
│       ├── login.vue          # login form (blank layout)
│       ├── projects/index.vue # CRUD: table + dialog form + delete alert
│       ├── status/index.vue   # experience + education CRUD tables
│       ├── settings/index.vue # profile + password
│       └── profile/index.vue  # read-only profile + stats
├── plugins/
│   ├── auth.client.js         # runs authStore.initAuth() on client boot
│   └── ssr-width.ts           # provideSSRWidth(1024)
└── stores/                    # Pinia stores (plain JS, no TS)
    ├── auth.js
    ├── project.js
    ├── experience.js
    └── education.js

server/api/__sitemap__/urls.ts   # sitemap sources (static routes + projects from API)
```

## Architecture & Key Patterns

### State management (Pinia)
Stores are auto-imported (`useAuthStore`, `useProjectStore`, `useExperienceStore`, `useEducationStore`). They hold state + do all API calls via `$fetch` against `useRuntimeConfig().public.apiBase`.

- **Auth store** (`app/stores/auth.js`): `login()` POST `/login` (response includes `user`); stores token in `localStorage` (if "remember me") or `sessionStorage` under `auth_token`; `fetchUser()` GET `/me`; `updateProfile` PUT `/user/profile`; `changePassword` POST `/change-password`; `logout` POST `/logout` with the Bearer token (revokes the Sanctum token server-side). Getters: `isAuthenticated`, `isAdmin` (checks `user.is_admin === true`), `userAvatar` (ui-avatars.com fallback — display only, there is no avatar upload API).
- **Project store** (`app/stores/project.js`): the most complex. Handles Laravel pagination responses (`response.data.data`), `technologies[]` and `gallery[]` array fields (stored as JSON strings server-side), full image URL resolution via `getFullImageUrl()` (prefixes `/storage/` with API origin), FormData multipart upload for images with `_method: PUT` for updates, and 401 handling (`handle401()` → clear auth + redirect to login). Validation errors (422) stored in `validationErrors`.
- **Experience / Education stores**: nearly identical shape. `fetchX(page, requireAuth=false)` — public fetch by default; pass `requireAuth=true` for admin. CRUD actions require a token.

### Image URL resolution
- `projectStore.getFullImageUrl(path)` (`app/stores/project.js:52`) — uses `new URL(apiBase).origin`, expects `/storage/...` paths. **Prefer this helper.**
- `getImageUrl()` local helper in `app/pages/projects/[slug].vue:301` — thin wrapper that passes absolute/`data:` URLs through and otherwise delegates to `projectStore.getFullImageUrl`. `projects/index.vue` calls the store helper directly.

### Auth flow
1. `app/plugins/auth.client.js` calls `initAuth()` on client boot → `loadFromStorage()` reads token from localStorage/sessionStorage → if token exists but no user, `fetchUser()`.
2. Route guards: `auth.js` (on admin pages), `admin.js` (dashboard, requires `isAdmin`).
3. Admin pages use `definePageMeta({ layout: 'admin-layout', middleware: 'auth' })`. `admin-layout.vue` shows a loading screen until `authStore.initialized`.
4. Login page uses `layout: 'blank'` (there is no `blank.vue` layout file — Nuxt falls back to no layout via the name; verify before changing).

### SEO
`app/composables/useSEO.ts` provides `useSEO()` — wraps `useSeoMeta` + `useHead` with canonical URL, breadcrumbs JSON-LD, custom JSON-LD, OG/Twitter tags. Pages call `useSEO({...})` in `<script setup>`. `createProjectSchema` and `createWebsiteSchema` are helpers for JSON-LD. Site-wide meta (GTM, OG defaults, sitemap config) is defined in `nuxt.config.ts` `app.head`.

### Design system conventions (IMPORTANT)
- **Brutalist/terminal aesthetic** — keep it consistent: `font-mono`, sharp corners (`border-radius: 0 !important` is repeated in scoped styles), heavy borders (`border-2 border-[#131313]`), hard offset shadows (`shadow-[6px_6px_0px_...]`), blocky micro-labels.
- **Palette**: `#131313` (near-black ink), `#fafafa` / `#f5f3f2` / `#e0dddc` (off-whites), `#aaa` / `#5d5f5f` (muted grays), `#28c840` (green accent / "live" status).
- **Copy style**: technical / pseudo-code labels — `Archive_01`, `Deployment_Status`, `Module_Active`, `SYS_UID_001`, `>> Executing_Output`, `STDOUT.LOG`, `// comment` annotations. Use `text-[9px]`–`text-[12px] font-black uppercase tracking-[0.2em]` for labels.
- **Animations**: scoped `@keyframes` per component (glitch-flicker, blink, shimmer, reveal-up via IntersectionObserver). Don't add global animation utilities unless needed.
- Admin area (`/admin`) intentionally uses a **different, cleaner shadcn look** (rounded, standard gray UI) — do not apply the brutalist theme there.

## Gotchas / Notes

- `.env.example` has `NUXT_PUBLIC_API_BASE` empty — public pages are designed to gracefully render empty/skeleton states when no API is configured.
- Stores re-implement token/header logic inline; follow the store-local pattern when adding new API calls. There is no shared `useApi` composable.
- `projects/index.vue` and `[slug].vue` resolve image URLs through `projectStore.getFullImageUrl` — prefer it for new code.
- `admin/index.vue` is a placeholder ("admin dashbord") — dashboard not yet built.
- Login uses `layout: 'blank'` and there is no `blank.vue` layout file; verify before changing.
- **Fonts are self-hosted.** `@nuxt/fonts` downloads them at build time into `/_fonts` via `fonts.families` in `nuxt.config.ts` (Inter, Google Sans Code). Do **not** re-add `fonts.googleapis.com` `<link>` tags or `@import url(...)` to the CSS — that reintroduces a render-blocking third-party request.
- The sitemap server route (`server/api/__sitemap__/urls.ts`) fetches `/projects` from the API at request time and gracefully degrades to static routes.
- Git workflow: `main` is the stable branch; there are also `origin/dev` and `origin/testing` branches. Commit message style: conventional (`feat:`, `fix:`, `refactor:`), single line, imperative.
