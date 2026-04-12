# Typography Standards

This document outlines the standardized typography system for the 3ant Agency website to ensure a premium, cohesive, and readable aesthetic across all pages.

## Font Families

We use a carefully selected font pairing that supports both Latin and Cyrillic scripts:

- **Display (Headings):** `Plus Jakarta Sans`
  - Used for: `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, and impactful hero text.
  - Characteristics: Geometric, modern, high impact.
  - CSS Class: `.font-display` (also applied globally to heading tags).

- **Body (Text):** `Inter`
  - Used for: Paragraphs, lists, long-form content, and general UI elements.
  - Characteristics: Exceptional readability, balanced proportions.
  - CSS Class: `.font-body` (applied globally to `body`).

- **Mono (System):** `JetBrains Mono`
  - Used for: Technical labels, case numbers, service tags, and status indicators.
  - Characteristics: High clarity, systematic feel.
  - CSS Class: `.font-mono`.

## Typography Rules

### Line Heights (Leading)

To ensure optimal readability and rhythm, we use "Medium" sized line-heights:

- **Headings:** `1.3`
  - Balances the vertical space for multi-line titles without making them feel disconnected.
- **Body Text:** `1.65`
  - Provides sufficient breathing room for long paragraphs, reducing eye strain.

### Font Weights

- **Headings:** Range from `font-bold` (700) to `font-extrabold` (800) for maximum impact.
- **Body:** `font-normal` (400) for general text, `font-medium` (500) for subtle emphasis.
- **Monospace Labels:** `font-bold` (700) or `font-black` (900) with `tracking-[0.2em]` or `tracking-widest`.

### Global Base Styles (`index.css`)

```css
@layer base {
  body {
    @apply font-body text-graphite-300 leading-[1.65];
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display text-white leading-[1.3] tracking-tight;
  }
}
```

## Page-Specific Implementation

When creating new pages, follow these naming conventions:

1. **Hero Titles:** Use `h1` with `font-extrabold` and `leading-[1.05]`.
2. **Section Headings:** Use `h2` or `h3` with `font-bold` and `leading-[1.2]`.
3. **Tags/Labels:** Use small `span` or `div` with `font-mono`, `font-black`, `uppercase`, and `tracking-widest`.
4. **Paragraphs:** Use `p` with `font-body` and `leading-relaxed`.

---
*Created on 2026-04-12 to standardize the 3ant visual identity.*
