# CLAUDE.md — Eyal TTS

Static Hebrew marketing site for Eyal Raanan's personal Taiwan trip-planning service (eyaltts.com), targeting Israeli travelers 37+.

## Stack

- Pure HTML + CSS + vanilla JS — no build step, no bundler, no framework
- RTL Hebrew (`dir="rtl"`, `lang="he"`) — all pages
- Shared logic: `nav.js` (hamburger nav + contact form IIFE), `styles.css`

## Pages

| File | URL (Wix) | Purpose |
|------|-----------|---------|
| `index.html` | `/` | Homepage — service overview, how-it-works, reviews, FAQ teaser |
| `taiwan.html` | `/taiwan` | Taiwan destination guide |
| `eyalraanan.html` | `/eyalraanan` | About Eyal Raanan |
| `reviews.html` | `/reviews` | Client testimonials |
| `faq.html` | `/faq` | 22 Q&As — FAQPage schema included |
| `contact.html` | `/contact` | Contact form + WhatsApp |
| `accessibility.html` | `/accessibility` | WCAG 2.0 AA declaration |

## SEO & AI Files

- `llms.txt` / `llms-full.txt` — AI crawler summaries (Hebrew + English); update when service details change
- `sitemap.xml` — update `<lastmod>` on any content change
- `robots.txt` — explicitly allows all major AI bots; don't restrict
- Schema: `TravelAgency` + `Service` + `WebSite` in `index.html`; `FAQPage` + `BreadcrumbList` in `faq.html`

## Deployment

Draft lives on **GitHub Pages** (`.html` links work there).
Production is on **Wix** — rebuilt natively; clean-URL canonicals in all pages are already set for Wix. On migration: 301 from `.html` → clean URL.

## Constraints

- **Never commit the Web3Forms key.** `nav.js:ACCESS_KEY` is intentionally empty (`''`). Key goes in `nav.js` only after confirming `.gitignore` covers it, or use Wix Forms instead.
- **Don't add `.html` to canonical/OG/sitemap/llms.txt URLs** — they're all set to clean paths (`/taiwan`, not `/taiwan.html`).
- **Don't change RTL layout or Hebrew text direction** without explicit instruction.
- **No build tooling** — no npm, no webpack, no Tailwind. Edit HTML/CSS/JS directly.
- **Schema is already in place** — read the existing `<script type="application/ld+json">` block before editing schema.
- **Don't create documentation files** unless asked.

## Contact (owner)

Eyal Raanan · +972-54-750-9292 · eyal@eyaltts.com

## When you edit X, also update Y

| Edit | Also update |
|------|-------------|
| `reviews.html` | `sitemap.xml` `<lastmod>` for `/reviews` |
| `faq.html` content | FAQPage schema block at bottom of same file |
| Service price / terms in `index.html` | `llms.txt` + `llms-full.txt` (AI crawlers read these) |
| Any page content | `sitemap.xml` `<lastmod>` for that page's URL |
