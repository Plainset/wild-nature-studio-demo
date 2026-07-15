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
| Image/content match | **FAIL (independent review, 2026-07-15)** | Builder's PASS claim is wrong for one image. `assets/img/diorama-waterhole.jpg`, used on `craft.html` (line 64), has alt text "A museum-scale diorama showing a young wild boar drinking at a waterhole, with deer and birds in the background" and caption "Habitat diorama, studio archive" — but the file itself (verified by direct read, `md5`, and `sips`/`file` dimension check: 1599×900, matching the file actually referenced in the HTML) shows a young man kneeling outdoors with his arm around a taxidermied wolf mount on a dirt/rock base, in front of a stone wall, potted flowers and greenery. There is no waterhole, no boar, no deer, no birds anywhere in the image. This is a fabricated image description, not a matter of interpretation — see Independent Reviewer Findings below. All other 8 images were independently re-checked against their alt/caption text and did match (workshop leopard mount, trade-show elephant, vulture in flight, leopard on driftwood, hippo build-process collage, hero diorama, team photo). |
| Fabricated claims | PASS | All copy traced to `BUILD_BRIEF.md` Allowed Facts, sourced from the business's own live site (HTTP) and a Sept 2025 Wayback snapshot of the same content. Facebook rating figure from LEADS.md was deliberately NOT repeated in copy since it couldn't be re-verified this session (Facebook blocked to plain curl); linked the Facebook page instead. |
| Mobile layout / nav toggle | PASS | Verified at 375px: mobile hamburger opens/closes the nav correctly (screenshot-verified before/after click), no horizontal scroll, stat row and contact info blocks wrap cleanly. |
| Text-overflow, real content lengths | PASS | Checked `.info-list`, `.footer-grid`, `.stat-row`, `.nav-links`, `.contact-grid`, `.info-card` at 375px with actual longest real strings (full email address, phone number, full country list, footer disclaimer). `scrollWidth <= clientWidth` on every checked box — 0 overflow issues. |
| Reveal-on-load (above-the-fold hero) | PASS | `main.js` includes the standing `getBoundingClientRect()` check on load per AGENTS.md's standing rule; confirmed 0 `[data-reveal]` elements stuck at `opacity:0` after a full scroll-through in the Playwright check. |

## Blocking Issues
| Issue | Evidence | Required fix |
|---|---|---|
| `diorama-waterhole.jpg` (craft.html, dioramas & habitats section) is mislabeled — alt text and copy describe a "wild boar drinking at a waterhole, with deer and birds," but the actual photo shows a person kneeling outdoors with a taxidermied wolf mount; no waterhole, boar, deer, or birds appear anywhere in the frame. | Direct file inspection + `md5`/`sips` dimension check confirms 1599×900 matches the file actually linked in `craft.html` line 64 — this is the file rendered on the live page, not a mix-up in review tooling. | Either (a) source and swap in a real wild-boar/waterhole diorama image from the business's own site if one exists, or (b) rewrite the alt text and `<span class="photo-caption">` to accurately describe what's shown (a mounted wolf, outdoor/garden setting), or (c) replace the image with a different already-vetted asset for this section and drop this file from the manifest. Re-run the image/copy-match manual check afterward. |

## Advisory Issues
- `family.jpg` (craft.html diorama-build-process gallery, captioned "The team, in front of a completed habitat") shows the team seated in front of a large winter diorama whose background (top-left of frame) depicts a wolf pack pulling down a wild boar — a predation scene with a bared-teeth wolf biting into the boar. `BUILD_BRIEF.md`'s "Do Not Claim" table explicitly excluded a separate predation-scene diorama photo (`lion-1532x852.jpg`) as "too intense for a cold-outreach demo," but a comparable predation motif is visible, identifiable, and not disclosed/caveated for this image, which was used. It's secondary/backgrounded rather than the focal subject, so not blocking on its own, but the same caution wasn't applied consistently — worth either cropping tighter to exclude the predation vignette, swapping to a different team/diorama photo, or explicitly noting the risk was considered and accepted (as was done for other borderline images).
- `dioramas-process-1.png` includes two panels (top-left, bottom-left) with a hippo mount's mouth wide open showing teeth/gums in extreme close-up, and a panel showing a part-covered mount with white foam understructure exposed through torn material. This is legitimate "craft process" documentation and much milder than the excluded images, but could read as mildly unsettling/uncanny to a cold-outreach stranger unfamiliar with taxidermy. Judgment call, not blocking.
- `giraffe-mount.jpg` and `logo.png` were downloaded/vetted but not placed in the final layout — harmless, not referenced by any page, so no QA impact.

## Fixed Verification
| Issue | Fix | Recheck result |
|---|---|---|
| Hero "Get in touch" ghost button illegible on dark photo (ratio 2.36:1) | Added `.btn-ghost-light` variant: `oklch(0.1 0.02 50 / 0.7)` background chip + white text + text-shadow | contrast-audit.js re-run: violation cleared; screenshot-confirmed legible on desktop + mobile |
| `.eyebrow` brass text at 4.44:1 (just under 4.5:1 threshold) | Darkened `--brass-deep` from `oklch(0.55 0.11 65)` to `oklch(0.46 0.115 62)` | contrast-audit.js re-run: violation cleared |
| `.hero-tag` chip at 4.03:1 | Increased chip background opacity from 0.55 to 0.82 and switched text to solid white | contrast-audit.js re-run: violation cleared |
| Gallery `<figure>` UA-stylesheet margin shrinking grid thumbnails | Added global `figure { margin: 0; }` reset | Bounding-box measurement re-run: items now fill grid cells evenly (153.5px × 3 at 375px, vs. 73.5px before) |

## Independent Reviewer Findings (2026-07-15)

Reviewed fresh per `.pipeline/checklists/REVIEW.md`, using the local
Playwright fallback (`.pipeline/qa/run-audit.js`, same tool the builder
used — chrome-devtools MCP and WebFetch/WebSearch confirmed denied this
session too) plus direct file inspection of every image and independent
`curl` fact re-verification. Re-ran `contrast-audit.js` and
`upscale-audit.js` at mobile (390px), tablet (834px), and desktop (1440px)
on all three pages.

- **Upscale audit**: reconfirmed 0 violations, 0 brokenImages, 0
  aspectMismatches at all three widths on all three pages. Matches the
  builder's claim exactly.
- **Contrast audit**: reconfirmed the same two flagged items on
  `index.html` (hero `h1`/`hero-lede`, ratio ~1.0–1.1) and reconfirmed
  they are script false positives, not real issues — inspected the
  underlying CSS (`.hero-bg` gradient stops: `oklch(0.1 0.02 50 / 0.96)`
  at the bottom fading to `oklch(0.18 0.03 60 / 0.25)` near the top, plus
  `text-shadow` on both `.hero h1` and `.hero-lede`) and took one desktop
  screenshot (`/tmp/wns_hero_review_desktop.png`) confirming genuinely
  legible white text over a dark scrim. One correction to the builder's
  own reasoning: the QA_REPORT description ("96% opaque black... where
  the text sits") slightly overstates it — the `<h1>` actually sits
  roughly 42–59% down the hero box, which computes to something closer to
  ~45–70% scrim opacity at that point, not 96% (that figure is the
  bottom-edge stop, not the text position). The practical conclusion
  (legible, PASS) is still correct on screenshot evidence, but the
  written justification was imprecise.
- **Reveal-on-load**: confirmed `assets/js/main.js` includes the standing
  `getBoundingClientRect()` pre-check (lines 48–68) required by AGENTS.md,
  and independently verified via a real simulated scroll-through that 0
  `[data-reveal]` elements are stuck invisible. (A `fullPage` Playwright
  screenshot taken *without* scrolling shows a large blank gap below the
  hero — this is a Playwright-screenshot artifact, since `fullPage`
  capture doesn't fire real scroll/intersection events; it is not a
  real-user-facing bug, confirmed by the scroll-through test.)
- **Fact re-verification**: independently curled all four host/protocol
  combinations of both domains. Confirmed the exact claimed pattern:
  `https://` fails identically on `wildnaturestudio.com`,
  `www.wildnaturestudio.com`, `wildnaturestudio.co.uk`, and
  `www.wildnaturestudio.co.uk` with
  `LibreSSL: error:1404B438:SSL routines:ST_CONNECT:tlsv1 alert internal error`;
  plain `http://` returns `200` with identical 45,627-byte content on all
  four. Confirmed `contact@wildnaturestudio.com` and
  `+44 792 772 8919` both appear verbatim in the live HTTP contact page
  and in the same Sept 2025 Wayback snapshot
  (`20250907055243`, confirmed via `archive.org/wayback/available`) the
  builder cites — so the phone number is actually corroborated by two
  independent sources (live site + 10-month-old archive), not just the
  single new source the task brief was cautious about. Not overclaimed on
  the built site — used identically in both places, no invented street
  address or embellishment. LEADS.md's own row for this business confirms
  the phone field was previously blank, so "newly found this session" is
  accurate.
- **Image selection judgment (focus area 1)**: 8 of the 9 used images are
  genuinely tasteful and appropriate for a cold-outreach demo — calm
  mounts, workshop/trade-show team shots, museum dioramas. The rejected
  photos (predation close-up, snarling/bared-teeth close-ups, damaged
  "before" restoration shots) were correctly identified as more intense
  than what's needed and correctly excluded. However, the judgment wasn't
  applied with full consistency: see the blocking `diorama-waterhole.jpg`
  mismatch and the advisory `family.jpg` predation-diorama-in-background
  note above. The 9 used images are an honest, non-cherry-picked
  representation of the business overall — nothing in the excluded set
  should have been included instead, and no image inflates or
  misrepresents what the studio does.

## Fix Pass Verification (2026-07-15)

Fixed both the blocking issue and the advisory issue found by the
independent reviewer. Session constraint note: chrome-devtools MCP and
WebFetch/WebSearch were confirmed permission-denied again this session, so
verification used the same local Playwright fallback
(`.pipeline/qa/run-audit.js` against `python3 -m http.server 4174`), plus
direct file reads/crops via Python PIL for the image work.

| Issue | Fix | Verification |
|---|---|---|
| **Blocking:** `diorama-waterhole.jpg` (craft.html) alt/caption fabricated a "wild boar drinking at a waterhole, with deer and birds" scene the image doesn't show. | Checked the full sourced asset pool (Asset Manifest + Do Not Claim table in `BUILD_BRIEF.md`) for a genuine waterhole/boar/deer/birds diorama photo — none exists. Rewrote `craft.html` line 64: alt text now reads "A studio team member kneeling beside a taxidermied wolf mount displayed on a rock and earth base, in an outdoor garden setting"; caption changed from "Habitat diorama, studio archive" to "Wolf mount, studio archive." Image file itself unchanged (it was never broken, only mis-described). `BUILD_BRIEF.md` asset manifest row updated to record the correction. | Direct re-read of the image file confirms the new alt/caption accurately describes what's shown (person + taxidermied wolf mount, stone wall, potted flowers, greenery — no waterhole/boar/deer/birds). Rendered page screenshot (`/tmp/wns_craft_fix_desktop2.png`) confirms the section now displays correctly with the corrected caption. |
| **Advisory:** `family.jpg` (craft.html gallery) had a wolf-pack-vs-boar predation diorama visible in the background, same category of image (`lion-1532x852.jpg`) already excluded elsewhere in this build as too intense for cold outreach. | Re-cropped the source file with Python PIL: `im.crop((380, 0, 1532, 852))`, reducing it from 1532×852 to 1152×852 (removed the leftmost ~380px containing the predation vignette). All 5 team members remain fully in frame; only calm/resting wolf mounts remain visible in the diorama backdrop. Updated `craft.html` line 91: `width` attribute corrected from 1532 to 1152, alt text changed from "...featuring wolves and a wild boar" to "...winter wolf habitat diorama" (boar reference removed since it's no longer in frame). `BUILD_BRIEF.md` asset manifest row updated. | Direct re-read of the cropped file confirms no trace of the predation scene, teeth, or gore remains — checked both a left-edge crop and the full cropped image. Rendered gallery screenshot (`/tmp/wns_gallery_fix.png`) confirms the team photo displays cleanly in its grid cell. |

Re-ran the full standard gate after both fixes, on all three pages:
- **contrast-audit.js @1440px**: identical results to the pre-fix baseline — index.html: same 2 known false-positive violations (hero `h1`/`hero-lede` over `.hero-bg` sibling div, previously verified genuinely legible by screenshot) + 2 needsManualCheck (photo-caption gradients); craft.html: 0 violations, 4 needsManualCheck (photo-caption/figcaption gradients, including the newly-worded "Wolf mount, studio archive" caption — same verified-fine pattern as before); contact.html: 0 violations, 0 needsManualCheck. No new issues introduced by the fixes.
- **upscale-audit.js @390/834/1440px, all 3 pages**: 0 violations, 0 brokenImages, 0 aspectMismatches at every width on every page (9 runs total). The re-cropped `family.jpg` (1152×852) still renders at/under native size in its `aspect-ratio: 4/3` gallery cell — no upscale violation introduced.
- **Reveal-on-load**: real scroll-through (mouse-wheel dispatched, not `fullPage` screenshot) on craft.html confirms 0 `[data-reveal]` elements stuck at `opacity:0`, including the corrected sections — no regression.

## Verdict
**PASS.** Both the blocking image/copy mismatch and the advisory
predation-in-background issue are fixed and independently re-verified.
Contrast, upscale, broken-images, and reveal-on-load gates all reconfirmed
clean with no regressions from the fixes. Clear for deploy.
