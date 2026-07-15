# Build Brief

## Session constraint note
WebSearch, WebFetch, and the chrome-devtools browser MCP tool were confirmed
permission-denied for this build. All verification below was done via `curl`
(direct HTTP/HTTPS handshake tests + Wayback Machine) and via a local
Playwright install (`.pipeline/.qa-scratch/node_modules/playwright`, driven
through `.pipeline/qa/run-audit.js`) for rendered-page QA, per the
documented fallback for exactly this situation.

## Contact
- Email: contact@wildnaturestudio.com
- Email source URL: http://wildnaturestudio.com/contact.html (live HTTP fetch) and http://web.archive.org/web/20250907055243/http://wildnaturestudio.co.uk/ (Wayback Sept 2025 snapshot, same address confirmed)
- Rechecked date: 2026-07-15
- Phone: +44 792 772 8919 (found live on contact.html footer; not previously logged in LEADS.md, newly confirmed this session)
- Address: RG1, Reading, Berkshire, UK (no fuller street address published anywhere on the site)

## Business State Check
- Status: still open / live web presence confirmed, unclear on trading currency beyond the site itself
- Checked sources:
  - `curl -sSv --max-time 10 https://wildnaturestudio.com` and the `www.`/`.co.uk` bare+www combinations — all four HTTPS combinations fail identically with `LibreSSL: error:1404B438:SSL routines:ST_CONNECT:tlsv1 alert internal error`, independently reconfirming the exact fact pattern logged in LEADS.md.
  - `curl -sS http://wildnaturestudio.com` (and www, and the `.co.uk` bare/www) — all four return HTTP 200 with the real site content (45,627 bytes, identical across all four). The site is fully reachable over plain HTTP even though HTTPS is broken.
  - `curl -s "https://archive.org/wayback/available?url=wildnaturestudio.co.uk"` → snapshot at `20250907055243` (7 Sept 2025), status 200. Fetched it directly: same content, same email, confirming the site was still live and unchanged as recently as ~10 months before this build (today is 2026-07-15).
  - `curl -s "https://archive.org/wayback/available?url=wildnaturestudio.com"` → no snapshot available for the `.com` domain specifically (co.uk is the one archived).
  - Facebook page `https://www.facebook.com/wildnaturestudio` (linked from the site's own footer, confirming it is genuinely their page) returned an HTTP 302 (login-wall redirect) on a plain curl — expected and not a blocker per instructions; could not independently re-verify the 4.0★/4-reviews figure this session, so that specific rating number was NOT carried into site copy (see Do Not Claim).
- Notes: The site's own footer copyright reads "© Copyright 2017", i.e. it hasn't been edited in years, but the Wayback snapshot from Sept 2025 proves it was still live and serving the same content well after that copyright date — nothing suggests closure, relocation, or a change of trade. The pitch (family-run taxidermy/diorama studio, three generations, Reading-based) is fully supported by the live content.
- Build decision: proceed

## Page Plan
- Scope: 3-page default (Home, Our Craft, Contact)
- Pages: `index.html`, `craft.html`, `contact.html`
- Reason for any extra page: none needed — the source site's 7 nav "pages" (About Us / Taxidermy / Dioramas / Replicas / Restorations / Sculptures / Contact) all render byte-for-byte the same long single-page content (verified by diffing extracted body text across all seven fetched HTML files), so there is really only one page's worth of source copy plus a contact block. Consolidated into Home (story/team) + Our Craft (the four service categories) + Contact.

## Pitch Hook
- Verified observation: the business's own domains (wildnaturestudio.com and wildnaturestudio.co.uk, all bare/www combinations) fail on HTTPS with a TLS handshake "internal error" — meaning most visitors on a modern browser hit a hard security warning before ever seeing the site, even though the underlying content (real photos, real family story, 70+ years of craft) is genuinely strong and still live over plain HTTP.
- Source URL: direct `curl -v` handshake tests against wildnaturestudio.com / www.wildnaturestudio.com / wildnaturestudio.co.uk / www.wildnaturestudio.co.uk, 2026-07-15.

## Allowed Facts
| Fact | Source URL | Used where |
|---|---|---|
| Family run company, three generations of taxidermists | http://wildnaturestudio.com/ (and all subpages, identical body) | Home hero, intro |
| 70+ years combined experience in Argentina, South Africa, US, Spain, now Reading UK | http://wildnaturestudio.com/ | Home intro, stat row |
| Client base includes public/private museums, philanthropists, collectors, companies | http://wildnaturestudio.com/ | Home intro, Contact |
| Ricardo Varela, Taxidermist — started with father age 15, quote as given | http://wildnaturestudio.com/aboutus.html | Home team quote block |
| Maria Varela, Taxidermist Assistant — quote as given | http://wildnaturestudio.com/aboutus.html | Home team quote block |
| Taxidermy service scope: full mounts, shoulder mounts, birds, skulls, fangs/tusks, fish & pets; mammal/bird/fish/reptile/amphibian mounts | http://wildnaturestudio.com/taxidermy.html | Craft page, service 01 |
| Dioramas & habitats: museums, exhibitions, shops, offices, homes; desert/polar/jungle/pond environments | http://wildnaturestudio.com/dioramas.html | Craft page, service 02 |
| Replicas: exact replicas of whole animals, heads, horns, fangs/tusks | http://wildnaturestudio.com/replicas.html | Craft page, service 03 |
| Restoration: repairing, cleaning, gesture changes, replacement of eyes/horns, degreasing, whitening | http://wildnaturestudio.com/restorations.html | Craft page, service 04 |
| Sculptures: create sculptures of missing parts/grafts, adapt damaged parts into habitats | http://wildnaturestudio.com/sculptures.html | Craft page, service 04 |
| Email: contact@wildnaturestudio.com | http://wildnaturestudio.com/contact.html | Home, Craft, Contact footers; Contact page |
| Phone: +44 792 772 8919 | http://wildnaturestudio.com/contact.html | Contact page, footers |
| Address: RG1, Reading, Berkshire, UK | http://wildnaturestudio.com/contact.html | Contact page, footers |
| Facebook: facebook.com/wildnaturestudio | http://wildnaturestudio.com/contact.html (their own footer link) | Contact page, footers |

## Do Not Claim
| Claim or uncertainty | Reason |
|---|---|
| Facebook "4.0★ / 4 reviews" | Logged in LEADS.md from an earlier verification pass, but Facebook could not be re-rendered this session (login-wall redirect on curl, and the browser MCP tool is permission-denied). Linked the Facebook page itself instead of repeating a rating figure I couldn't personally re-check. |
| Specific street address beyond "RG1, Reading, Berkshire" | Never published anywhere on the site — only the postcode district and town are given. Did not fabricate a fuller address or a map pin. |
| Identifying any specific photo as depicting "Ricardo Varela" or "Maria Varela" by name | Filenames (`ricardo1`, `ricardo-chuli`) suggest but don't confirm identity, and no photo on the source site is explicitly captioned with a name. Used their quotes (directly sourced, correctly attributed) as text, but photo captions describe the work/scene generically rather than asserting who is pictured. |
| CIC UK Trophy Evaluation Board affiliation / hunting-trophy measuring service (`cicukteb.com` link, Trevor Hughes) | Real content on the source site (index.html), but it's a third-party organisation's own logo/branding, not the business's own asset, and it pulls the framing toward hunting trophies rather than the museum/craft angle that fits the rest of the site's content. Left out of the demo entirely rather than reuse a third party's logo or lean into that framing. |
| Any restoration "before" photos (site images `26-*.jpg`, `27-*.jpg`) | Real, on-domain assets, but depict damaged/decayed mount detail (exposed tissue in a torn mouth) that clears the bar for "graphic/upsetting imagery" the task flagged as a specific risk for this business. Described the restoration service in text only instead of forcing these in. |
| Predation-scene diorama photo (`lion-1532x852.jpg`, lion biting a mounted gazelle) | Real, on-domain, tasteful by museum-diorama standards, but judged too intense for a cold-outreach demo per the same graphic-imagery caution. Not used. |
| Snarling/bared-teeth mount close-ups (`walf-1532x852.jpg`, `bufalo-1532x852.jpg` extreme close-up) | Same reasoning — not gory, but more intense than needed when calmer, equally real alternatives (leopard, giraffe, vulture, family/workshop shots) were available. |

## Asset Manifest
| File | Source URL | Native size | License/credit | Watermark checked | Intended section | Copy match |
|---|---|---|---|---|---|---|
| hero-diorama.jpg (site: dsc09785-2448x3264.jpg) | http://wildnaturestudio.com/assets/images/dsc09785-2448x3264.jpg | 2448×3264 | Business's own site asset | yes/none found | Home hero | Museum-scale habitat diorama, matches "museum-quality craft" pitch |
| family.jpg (site: family-1532x852.jpg) | http://wildnaturestudio.com/assets/images/family-1532x852.jpg | 1532×852 | Business's own site asset | yes/none found | Craft page, diorama process gallery | Team photo in front of a completed habitat diorama |
| ricardo-workshop.jpg (site: ricardo1-3768x2892.jpg) | http://wildnaturestudio.com/assets/images/ricardo1-3768x2892.jpg | 3768×2892 | Business's own site asset | yes/none found | Home, "In the workshop" | Taxidermist finishing a leopard mount |
| team-tradeshow.jpg (site: ricardo-chuli-3768x2892.jpg) | http://wildnaturestudio.com/assets/images/ricardo-chuli-3768x2892.jpg | 3768×2892 | Business's own site asset | yes/none found | Home, museum-scale section | Team at a trade exhibition with an elephant mount/diorama |
| dioramas-process-1.png (site: dioramas-web-1024x768.png) | http://wildnaturestudio.com/assets/images/dioramas-web-1024x768.png | 1024×768 | Business's own site asset | yes/none found | Craft page, diorama process gallery | Hippo mount build-process collage |
| dioramas-process-2.png (site: dioramas-web2-1172x761.png) | http://wildnaturestudio.com/assets/images/dioramas-web2-1172x761.png | 1172×761 | Business's own site asset | yes/none found | Craft page, diorama process gallery | Hippo mount build-process collage, continued |
| diorama-waterhole.jpg (site: 81570583-...-1599x900.jpg) | http://wildnaturestudio.com/assets/images/81570583-4812-47d1-ab27-28a257bd0904-1599x900.jpg | 1599×900 | Business's own site asset | yes/none found | Craft page, dioramas & habitats section | Wild boar diorama scene |
| leopard-mount.jpg (site: chita-1532x852.jpg) | http://wildnaturestudio.com/assets/images/chita-1532x852.jpg | 1532×852 | Business's own site asset | yes/none found | Craft page, taxidermy section | Mounted leopard on driftwood |
| vulture-mount.jpg (site: aves-1532x852.jpg) | http://wildnaturestudio.com/assets/images/aves-1532x852.jpg | 1532×852 | Business's own site asset | yes/none found | Craft page, taxidermy section | Mounted vulture in flight |

All images displayed on the built site are shown at or below their native
resolution (verified via the upscale audit — 0 violations at mobile/tablet/
desktop on all three pages). Two additional images (`jiraffe-1532x852.jpg`
giraffe mount, and the `logo-horizontal1-3430x1927.png` wordmark) were
downloaded and vetted (real, on-domain, non-graphic) but not used in the
final layout, so they were removed from the repo rather than left
unreferenced.

## Design Notes
- Palette: deep forest/olive green (derived from the studio's own logo
  colour, `rgb(77,107,58)` per their Facebook icon styling) + warm brass/
  ochre accent + oak-brown footer + parchment/cream background + near-black
  ink-brown text — a natural-history-museum field-journal feel, distinct
  from a generic "nature green" template.
- Image layout pattern: wrapper `aspect-ratio` + `object-fit: cover`
  throughout (`.photo-frame`, `.gallery-item`, `.photo-collage .photo-frame`).
- Risk notes: this business's subject matter (taxidermy) carries real risk
  of upsetting imagery. Deliberately excluded predation-scene, snarling/
  bared-teeth close-ups, and damaged-mount "before" restoration photos even
  though all were real, on-domain, watermark-free assets — see Do Not Claim
  for the specific rejected files and reasoning. Restoration/sculpture is
  covered in text only, no photo, per AGENTS.md's "photo-light is
  acceptable" guidance.

## Builder QA
- Contrast: `.pipeline/qa/contrast-audit.js` via `.pipeline/qa/run-audit.js` (Playwright fallback, chrome-devtools MCP denied) at 1440px on all three pages. Found and fixed two real issues: (1) `.eyebrow` brass text at 4.44:1 vs 4.5:1 threshold — darkened `--brass-deep`; (2) `.hero-tag` chip at 4.03:1 — increased chip background opacity. Also found and fixed a genuinely illegible hero "Get in touch" ghost button (dark-green-on-dark-photo) by adding a `.btn-ghost-light` variant with a scrim + text-shadow. Two remaining flagged items (hero `h1`/`hero-lede`, white text ratio ~1.1–1.2) are a known script limitation — text sits over a separate `.hero-bg` sibling div with the photo + gradient scrim, which the script's ancestor-background walk doesn't detect, so it defaults to the page's parchment background instead of flagging `needsManualCheck`. Manually verified via screenshot (`/tmp/wns_hero_desktop.png`, `/tmp/wns_home_mobile_fixed.png`): the gradient scrim is 96% opaque black at the bottom (where the text sits) fading to 25% near the top, giving genuinely strong contrast in the browser. Confirmed pass by eye.
- Upscale mobile (390px): 0 violations, 0 broken images, all 3 pages.
- Upscale tablet (834px): 0 violations, 0 broken images, all 3 pages.
- Upscale desktop (1440px): 0 violations, 0 broken images, all 3 pages.
- Broken images: none found by the audit script or by manual review.
- Manual checks: found and fixed a real layout bug — `<figure class="gallery-item">` inherited the browser default UA-stylesheet margin (`1em 40px`), shrinking the diorama-process gallery thumbnails to ~45% of their grid cell width and misaligning them. Fixed with a global `figure { margin: 0; }` reset. Re-verified via bounding-box measurement (grid items now fill their cells evenly) and a follow-up mobile screenshot. Also checked text-overflow with the actual longest real strings (email, phone, full country list, footer text) at 375px — zero overflow (`scrollWidth <= clientWidth` on every checked box). Mobile nav toggle opens/closes correctly (screenshot-verified).
