---
name: create-vibe-app
description: 'Create web applications using vanilla HTML, CSS, and JavaScript or React (Next.js). Use when: building UI features, interactive components, or complete web apps. Supports both minimal vanilla implementations and React component-based apps with Tailwind CSS and TypeScript.'
argument-hint: 'Describe the web application or component to create'
---

# Create Vibe App

Build web applications using vanilla HTML, CSS, and JavaScript **or React/Next.js** with a cohesive visual design and minimal dependencies.
Create new directory [APP_NAME] under `app/vibe-app` directory
Add new description to `data/vibeAppData.ts` file

## Constraints

- **Framework choice** — Use vanilla HTML/CSS/JS for simple tools, React (Next.js) for component-based or stateful apps
- **React apps** — Use TypeScript (`.tsx`), Tailwind CSS for styling, `'use client'` directive for interactive components
- **React structure** — Each app gets a `page.tsx` (main component) and `layout.tsx` (wrapper layout)
- **Minimal dependencies** — Prefer native browser APIs or React built-ins; avoid unnecessary third-party packages
- **CSS formatting** — 2-space indentation, Helvetica font-family (vanilla); Tailwind utility classes (React)
- **Typography** — Input/textarea elements at 16px font size
- **Naming** — Descriptive class names using kebab-case (vanilla) or Tailwind utilities (React)

## HTML Structure

Always start with semantic HTML5:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Name</title>
  <style>
    <!-- CSS here (see CSS guidelines below) -->
  </style>
</head>
<body>
  <!-- Content here -->
  <script type="module">
    // JavaScript here (see JavaScript guidelines below)
  </script>
</body>
</html>
```

## CSS Guidelines

CSS must follow this structure and indentation:

```css
<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Helvetica, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0;
  padding: 0;
}

input,
textarea {
  font-size: 16px;
  font-family: inherit;
}

/* Component styles below */
</style>
```

**Formatting rules:**
- 2-space indentation (no tabs)
- Always include `* { box-sizing: border-box; }` at the top
- Helvetica as primary font with system font fallbacks
- Explicitly set `input` and `textarea` to 16px to prevent iOS zoom-on-focus

## JavaScript Guidelines

JavaScript must be in a module script:

```javascript
<script type="module">
// Code starts unindented at this level

const handler = () => {
  console.log('Variables and functions');
};

document.addEventListener('DOMContentLoaded', handler);
</script>
```

**Formatting rules:**
- 2-space indentation
- No indentation at the first level inside `<script type="module">`
- Use `const`/`let`, arrow functions, and native DOM APIs
- Leverage `event` listeners and `querySelector`/`querySelectorAll`

## React / Next.js Guidelines

When building with React, use Next.js file conventions:

**layout.tsx** — Wraps the page with shared layout:
```tsx
export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-white text-black dark:bg-gray-950 dark:text-white">
      {children}
    </div>
  )
}
```

**page.tsx** — Main interactive component:
```tsx
'use client'

import { useState, useCallback } from 'react'

export default function MyApp() {
  const [value, setValue] = useState('')

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* content */}
    </div>
  )
}
```

**Formatting rules:**
- Always add `'use client'` at the top for interactive components
- Use `useState`, `useCallback`, `useMemo` from React for state and memoization
- Use Tailwind CSS utility classes for all styling
- Support dark mode via `dark:` Tailwind variants
- Use TypeScript types for all props and state

## When to Use

✓ Building single-page applications with minimal dependencies  
✓ Interactive forms, calculators, or dashboards  
✓ Prototyping UI components quickly  
✓ Creating lightweight web tools  
✓ Stateful or complex UI → use React/Next.js with TypeScript and Tailwind  

✗ Complex global state management → Consider Zustand or Redux  
✗ Need transpilation for older browsers → Use build tools  

## Procedure

1. **Choose framework** — Vanilla HTML/CSS/JS for simple tools; React/Next.js for stateful or component-based apps
2. **Plan the layout** — Sketch components and state flow
3. **Write structure** — Semantic HTML (vanilla) or `page.tsx` + `layout.tsx` (React)
4. **Apply styling** — CSS template with Helvetica (vanilla) or Tailwind utilities with dark mode (React)
5. **Add interactivity** — Vanilla event listeners or React hooks (`useState`, `useCallback`)
6. **Test** — Verify functionality across browsers
7. **Deploy** — Single HTML file (vanilla) or Next.js route under `app/vibe-app/[APP_NAME]/`

## Example Command

```
/create-vibe-app Build a todo list app with add/delete/mark-complete features
```

## References

- [MDN: HTML Semantic Elements](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
- [MDN: DOM Events](https://developer.mozilla.org/en-US/docs/Web/Events)
- [MDN: CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model)
