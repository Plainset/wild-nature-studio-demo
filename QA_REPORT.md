# QA Report

Ran via `.pipeline/qa/run-audit.js` (local Playwright fallback, since the
chrome-devtools MCP tool and WebFetch/WebSearch were permission-denied for
this session) against a local `python3 -m http.server` instance of the
built site.

## Pages Checked
- index.html (Home)
- craft.html (Our Craft)
- contact.html (Contact)

## Audit Results
| Check | Result | Evidence |
|---|---|---|
| Contrast audit @1440 | PASS (after 2 fixes) | Home: 2 flagged items remain, both confirmed false positives on manual review (see Manual Checks). Craft: 0 violations, 4 needsManualCheck (photo-caption gradients, verified fine). Contact: 0 violations, 0 needsManualCheck. |
| Upscale mobile (390px) | PASS | 0 violations, 0 brokenImages, 0 aspectMismatches on all 3 pages |
| Upscale tablet (834px) | PASS | 0 violations, 0 brokenImages, 0 aspectMismatches on all 3 pages |
| Upscale desktop (1440px) | PASS | 0 violations, 0 brokenImages, 0 aspectMismatches on all 3 pages |
| Broken images | PASS | 0 across all pages/widths (upscale-audit.js `brokenImages`) |
| Aspect mismatch advisory | PASS (advisory only) | 0 flagged |

## Manual Checks
| Check | Result | Notes |
|---|---|---|
| Text on photo (hero h1/lede) | PASS | contrast-audit.js flags these as violations (ratio ~1.1–1.2) but this is a known script limitation: the hero text sits over a separate `.hero-bg` sibling `<div>` (photo + linear-gradient scrim), not a same-element/ancestor background, so the script's background walk falls through to the page's parchment colour instead of routing this to `needsManualCheck`. Screenshots (`/tmp/wns_hero_desktop.png`, `/tmp/wns_home_mobile_fixed.png`) confirm strong real contrast: white text with text-shadow sits in the bottom, most-opaque part of the scrim (96% black at the bottom stop). Verified legible at desktop and mobile widths. |
| Gradient/::before backgrounds (photo-caption chips, craft page) | PASS | 4 items flagged as needsManualCheck (caption text over `linear-gradient(to top, dark, transparent)` at the bottom of photo frames). Same pattern used successfully elsewhere in the pipeline (scrim + text-shadow). Screenshot-verified legible. |
| Ghost button on hero (dark-on-dark) | FIXED | Found real issue: default `.btn-ghost` (dark green text/border) was nearly invisible over the dark hero photo. Added `.btn-ghost-light` variant (opaque dark chip + white text + text-shadow) and re-ran contrast-audit.js to confirm the fix (ratio failure went from 2.36:1 to passing). Screenshot-verified on desktop and mobile. |
| Gallery thumbnail sizing (Craft page, diorama build process) | FIXED | Found real layout bug: `<figure class="gallery-item">` inherited the browser default UA margin (`1em 40px`), shrinking each grid item to ~45% of its intended cell width (measured via `getBoundingClientRect()`: 73.5px actual vs ~163px expected at 375px viewport). Root-caused and fixed with a global `figure { margin: 0; }` reset. Re-measured after fix: all three items filled their cells evenly (153.5px each, matching the 2-column grid at that width). |
| Image/content match | PASS | Every image's caption/alt text matches what's actually depicted (workshop shot captioned "in the workshop," trade-show photo captioned as such, diorama process shots labelled by stage). No image reused across sections with a mismatched caption. |
| Fabricated claims | PASS | All copy traced to `BUILD_BRIEF.md` Allowed Facts, sourced from the business's own live site (HTTP) and a Sept 2025 Wayback snapshot of the same content. Facebook rating figure from LEADS.md was deliberately NOT repeated in copy since it couldn't be re-verified this session (Facebook blocked to plain curl); linked the Facebook page instead. |
| Mobile layout / nav toggle | PASS | Verified at 375px: mobile hamburger opens/closes the nav correctly (screenshot-verified before/after click), no horizontal scroll, stat row and contact info blocks wrap cleanly. |
| Text-overflow, real content lengths | PASS | Checked `.info-list`, `.footer-grid`, `.stat-row`, `.nav-links`, `.contact-grid`, `.info-card` at 375px with actual longest real strings (full email address, phone number, full country list, footer disclaimer). `scrollWidth <= clientWidth` on every checked box — 0 overflow issues. |
| Reveal-on-load (above-the-fold hero) | PASS | `main.js` includes the standing `getBoundingClientRect()` check on load per AGENTS.md's standing rule; confirmed 0 `[data-reveal]` elements stuck at `opacity:0` after a full scroll-through in the Playwright check. |

## Blocking Issues
| Issue | Evidence | Required fix |
|---|---|---|
| (none remaining — both found issues below were fixed and reverified) | | |

## Advisory Issues
- None outstanding. `giraffe-mount.jpg` and `logo.png` were downloaded/vetted but not placed in the final layout — harmless, not referenced by any page, so no QA impact.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Hero "Get in touch" ghost button illegible on dark photo (ratio 2.36:1) | Added `.btn-ghost-light` variant: `oklch(0.1 0.02 50 / 0.7)` background chip + white text + text-shadow | contrast-audit.js re-run: violation cleared; screenshot-confirmed legible on desktop + mobile |
| `.eyebrow` brass text at 4.44:1 (just under 4.5:1 threshold) | Darkened `--brass-deep` from `oklch(0.55 0.11 65)` to `oklch(0.46 0.115 62)` | contrast-audit.js re-run: violation cleared |
| `.hero-tag` chip at 4.03:1 | Increased chip background opacity from 0.55 to 0.82 and switched text to solid white | contrast-audit.js re-run: violation cleared |
| Gallery `<figure>` UA-stylesheet margin shrinking grid thumbnails | Added global `figure { margin: 0; }` reset | Bounding-box measurement re-run: items now fill grid cells evenly (153.5px × 3 at 375px, vs. 73.5px before) |

## Verdict
PASS
