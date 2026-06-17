# Go-Live & Wix Migration Checklist — Eyal TTS

Purpose: ship the site to production at **https://www.eyaltts.com/** on Wix without dropping any SEO / AI-discoverability work already built into this repo. Work top-to-bottom; nothing ranks until Phase 2 is done.

Context: this repo is currently a **draft on GitHub Pages**. Wix serves **clean URLs** (`/taiwan`) natively — which is why the canonicals/sitemap/llms.txt here already use clean URLs. Wix regenerates its own `<head>`, robots.txt, and sitemap, so several assets below must be **re-applied inside Wix**, not just uploaded.

---

## Phase 0 — Before you touch Wix (prep)

- [ ] **Decide the canonical host**: `www.eyaltts.com` vs `eyaltts.com`. Pick one; 301-redirect the other. (This repo assumes `www`.)
- [ ] **Get a Web3Forms access key** (free, no account — confirm an email) at web3forms.com, OR decide to use **native Wix Forms** (recommended on Wix). The draft form in `nav.js` has a `mailto:` fallback until a key is set.
- [ ] **Prepare a 1200×630 social share image** (the repo points OG tags at a 1200×630 crop of `header2025.jpg` — confirm the crop isn't awkward, or export a dedicated one).
- [ ] **Confirm favicon**: `favicon.svg` exists here. Wix wants a square PNG (e.g. 512×512) uploaded in its settings — export one from the SVG.

## Phase 1 — Build in Wix (parity with this repo)

Re-create each page in Wix and copy the content. Map slugs **exactly** so they match the canonicals/sitemap:

- [ ] `/` (home) ← index.html
- [ ] `/taiwan` ← taiwan.html
- [ ] `/eyalraanan` ← eyalraanan.html
- [ ] `/reviews` ← reviews.html
- [ ] `/faq` ← faq.html
- [ ] `/contact` ← contact.html

Per page, set in **Wix SEO panel (Edit SEO tags)**:
- [ ] **Title tag** — copy the `<title>` from each file (already query-optimized; see table below).
- [ ] **Meta description** — copy from each file.
- [ ] **Social share** (og:title/description/image 1200×630) — copy from each file.
- [ ] **Site language = Hebrew**, text direction **RTL**.
- [ ] **Canonical** — Wix auto-sets self-referencing canonicals to the clean URL. Verify it matches (no `?` params, no `.html`).

Titles to enter (already validated against Hebrew search demand):
| Slug | Title |
|------|-------|
| `/` | טיול עצמאי בטייוואן – תכנון אישי בעברית \| Eyal TTS |
| `/taiwan` | טיול בטייוואן: מסלול, אטרקציות ועונה מומלצת \| Eyal TTS |
| `/faq` | שאלות נפוצות על טיול בטייוואן – ויזה, עונה מומלצת, כמה ימים |
| `/eyalraanan` | איל רענן – מתכנן ומלווה טיולים לטייוואן \| Eyal TTS |
| `/reviews` | המלצות וחוות דעת – טיול עצמאי בטייוואן \| Eyal TTS |
| `/contact` | צור קשר – תכנון טיול לטייוואן בעברית \| Eyal TTS |

### Structured data (the strongest asset — don't lose it)
Wix's built-in schema is generic. Re-add the rich JSON-LD `@graph` from each file via **Settings → Custom Code → Add code to `<head>`** (or per-page custom code), OR Wix's per-page "Custom structured data markup" field:
- [ ] `TravelAgency` + `Service`/`OfferCatalog` (home)
- [ ] `FAQPage` (faq) — powers rich results + AI answers
- [ ] `Review` + `AggregateRating` (reviews) — keep here, **NOT** on home
- [ ] `BreadcrumbList` (all subpages)
- [ ] `Person` (Eyal) for E-E-A-T
- [ ] After launch, validate each at **search.google.com/test/rich-results**.

### Forms
- [ ] Replace the draft form with a **native Wix Form** → set it to email `eyal@eyaltts.com` + store submissions. (Works for every visitor; no WhatsApp needed.) Keep WhatsApp/phone/email as alternate channels.

### Files Wix manages itself (re-apply, don't just upload)
- [ ] **robots.txt** — Wix generates its own. In Wix SEO settings, confirm it **allows** crawlers and the AI bots; add the `Sitemap:` line. (Reference: `robots.txt` in this repo, including the GPTBot/ClaudeBot/PerplexityBot allow-list.)
- [ ] **sitemap.xml** — Wix auto-generates `/sitemap.xml`. Use Wix's; don't upload this repo's. Verify all 6 URLs appear.
- [ ] **llms.txt / llms-full.txt** — ⚠️ Wix does **not** let you serve arbitrary root `.txt` files easily. Options: (a) test whether `www.eyaltts.com/llms.txt` can be served via a Wix URL-redirect/Velo HTTP function; (b) if not possible, host these two files on a sub-path you control, or accept that the HTML + schema carry the AI-discoverability load. Re-add the `<link rel="alternate" type="text/plain" href=".../llms.txt">` head tag only if the file actually resolves.

## Phase 2 — Connect domain & make it findable (nothing ranks before this)

- [ ] **Connect `www.eyaltts.com`** to the Wix site; enable HTTPS.
- [ ] **301 redirects** (Wix URL Redirect Manager): non-www → www, and any old/legacy URLs (incl. any `.html`) → clean URLs.
- [ ] **Google Search Console** — add the domain property, verify (DNS TXT), **submit the sitemap**, request indexing for the 6 pages.
- [ ] **Bing Webmaster Tools** — add + submit sitemap (Bing also feeds Copilot / ChatGPT search).
- [ ] Confirm pages are **indexable**: no stray `noindex`, canonicals resolve 200 (not 404/redirect).

## Phase 3 — Off-page authority (this is what actually wins #1)

- [ ] **Google Business Profile** — create/claim. Category: *Travel agency* / *Tour operator*. Service-area business (serves Israel, about Taiwan). Add phone, website, hours, photos. **This is the single highest-leverage local asset.**
- [ ] **Collect Google reviews** — third-party reviews outweigh on-site `Review` schema. Ask past happy clients (the ones already quoted) to post on Google.
- [ ] **Backlink from the "למטייל" article** → request a link to eyaltts.com.
- [ ] List in relevant Hebrew travel directories / forums.
- [ ] Link the site from the **Facebook** and **LinkedIn** profiles (already in `sameAs`).

## Phase 4 — Post-launch verification

- [ ] **Rich Results Test** + **Schema validator** pass on all pages.
- [ ] **PageSpeed Insights / Core Web Vitals** — check mobile LCP/CLS (Wix is heavier than this static build; watch the hero image).
- [ ] **Mobile-friendly** + RTL renders correctly on a real phone.
- [ ] Social share preview (Facebook/WhatsApp) shows the 1200×630 card + correct title.
- [ ] Submit a test lead through the form → confirm it reaches `eyal@eyaltts.com`.
- [ ] In Search Console, watch **Coverage** (all 6 indexed) and **Enhancements** (FAQ, Breadcrumb, Merchant/Review) over the first weeks.

## Timing note (from Google Trends data)
Israeli interest in Taiwan travel peaks **Oct–Mar** and is near-zero in summer. Aim to be **live and indexed before September**, and concentrate any content pushes / ads in **Sep–Feb**.

---

### Repo → Wix asset map (quick reference)
| Repo asset | At launch |
|-----------|-----------|
| 6 HTML pages | Rebuild in Wix; copy content + SEO tags |
| JSON-LD `@graph` | Re-add via Wix custom code; validate |
| `styles.css` | Rebuild styling in Wix editor (not portable) |
| `nav.js` form handler | Replace with native Wix Form |
| `favicon.svg` | Export PNG, upload in Wix settings |
| `robots.txt` | Re-apply rules in Wix SEO settings |
| `sitemap.xml` | Use Wix's auto-generated sitemap |
| `llms.txt` / `llms-full.txt` | Verify Wix can serve at root; else host elsewhere |
