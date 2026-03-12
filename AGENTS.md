# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project Overview

A personal blog and vibe-app showcase built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Contentlayer2**. It includes a blog (MDX-powered), tag pages, an experience page, and a `/vibe-app` section showcasing small interactive tools.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (dark mode via `dark:` variants)
- **Content**: Contentlayer2 (MDX blog posts)
- **Package manager**: Yarn

## Repository Structure

```
app/                    # Next.js App Router pages
  vibe-app/             # Vibe app showcase section
    [tool-name]/        # Each tool has its own route
      layout.tsx        # Tool layout (place metadata here)
      page.tsx          # Tool page ('use client' if interactive)
components/             # Shared React components
data/                   # Static data files
  vibeAppData.ts        # Registry of all vibe apps (add new entries here)
  headerNavLinks.ts     # Navigation links
layouts/                # Page layout wrappers
public/                 # Static assets
css/                    # Global styles
contentlayer.config.ts  # Contentlayer MDX config
next.config.js          # Next.js config (CSP, Permissions-Policy headers)
```

## Adding a New Vibe App

1. **Create the route** at `app/vibe-app/[tool-name]/`:

   - `layout.tsx` — export `metadata` using `genPageMetadata` from `app/seo`
   - `page.tsx` — add `'use client'` at the top if the component uses hooks or browser APIs

2. **Register the app** in `data/vibeAppData.ts`:

   ```ts
   {
     title: 'My Tool',
     description: 'Short description shown on the vibe app listing page.',
     href: '/vibe-app/my-tool',
   }
   ```

3. Metadata must live in a **Server Component** (`layout.tsx`), never in a `'use client'` file.

## Key Conventions

- **Dark mode**: Always add `dark:` variants alongside light-mode Tailwind classes.
- **Client components**: Use `'use client'` only when needed (hooks, browser APIs). Keep metadata in `layout.tsx`.
- **No external UI libraries**: Use plain Tailwind CSS for styling — no shadcn, MUI, etc.
- **Geolocation / browser APIs**: The `Permissions-Policy` header in `next.config.js` controls which browser APIs are allowed. Update it if a new vibe app needs additional permissions (e.g., `geolocation=(self)`).

## Security Headers

Security headers are configured in `next.config.js` under `securityHeaders`. Notable ones:

- **Content-Security-Policy**: Adjust `script-src`, `connect-src`, etc. when integrating external services.
- **Permissions-Policy**: Explicitly allow browser features needed by vibe apps (camera, microphone, geolocation, etc.).

## Commands

```bash
yarn dev        # Start development server (http://localhost:3000)
yarn run build      # Production build
yarn lint       # Run ESLint
npx tsc --noEmit  # Type-check without building
```

## Before Committing

Always run a production build locally before pushing. Vercel runs `yarn run build` (based on the `yarn.lock` lockfile) during deployment — catch failures early:
A successful build is required for deployment. Fix any type errors, lint errors, or build failures before committing.

## Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <short summary>
```

**Types:**

| Type       | When to use                                              |
| ---------- | -------------------------------------------------------- |
| `feat`     | New feature or vibe app                                  |
| `fix`      | Bug fix                                                  |
| `chore`    | Maintenance, config, tooling (no production code change) |
| `refactor` | Code restructure without behavior change                 |
| `style`    | Formatting, Tailwind class tweaks, no logic change       |
| `docs`     | Documentation only (AGENTS.md, README, blog posts)       |
| `perf`     | Performance improvement                                  |
| `test`     | Adding or updating tests                                 |

**Examples:**

```
feat(vibe-app): add car park locator tool
fix(next-config): allow geolocation via Permissions-Policy
chore: remove GitHub Actions deployment workflows
docs(agents): add conventional commit guidelines
refactor(vibe-app): rename vibe-software to vibe-app
```

**Rules:**

- Use lowercase for type, scope, and summary
- Keep the summary under 72 characters
- Use imperative mood ("add", "fix", "remove" — not "added", "fixed", "removed")
- Scope is optional but recommended (e.g., `vibe-app`, `blog`, `components`, `next-config`)

## Content (Blog Posts)

Blog posts live in `data/blog/` as `.mdx` files. Contentlayer processes them at build time. See `contentlayer.config.ts` for the schema.
