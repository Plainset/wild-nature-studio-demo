# Pipeline Status

Operational handoff only. `LEADS.md` and `OUTREACH_LOG.md` remain the source of truth.

- Current phase: Deployed. Fix phase complete, deploy complete, outreach
  drafting blocked on permission denial (see below).
- Last trusted commit: `0777eec` "Fix blocking image mismatch and advisory
  predation background" (see `git log -1`).
- Known untrusted state: none. The builder's original QA_REPORT PASS claim
  for `diorama-waterhole.jpg` was wrong (fabricated alt/caption); this is now
  corrected and independently re-verifiable by direct file read against the
  live alt/caption text in `craft.html`.
- Fixes applied this pass:
  - **Blocking:** `diorama-waterhole.jpg` (craft.html) alt text and caption
    rewritten to accurately describe the actual photo (a studio team member
    kneeling beside a taxidermied wolf mount, outdoor garden setting) since
    no genuine waterhole/boar/deer/birds diorama image exists anywhere in
    this business's sourced asset pool.
  - **Advisory:** `family.jpg` (craft.html gallery) re-cropped
    (1532×852 → 1152×852) to remove a wolf-pack-vs-boar predation vignette
    visible in the original background; alt text and `width` attribute
    updated to match.
  - Re-ran `contrast-audit.js` and `upscale-audit.js` on all three pages at
    mobile/tablet/desktop widths after both fixes: identical baseline
    results, 0 new violations, 0 brokenImages, 0 aspectMismatches. Reveal-
    on-load re-verified via real scroll-through: 0 stuck elements.
- Next exact action: Draft outreach — blocked this session on Gmail MCP
  permission denial (see Outreach state below). Retry drafting in a session
  where the Gmail MCP tools and/or chrome-devtools browser tool are actually
  available; confirm the vdvalkproductions@gmail.com account switcher first,
  per AGENTS.md step 7 (lead with the SSL/HTTPS handshake failure as the
  verified observation hook — see BUILD_BRIEF.md Pitch Hook).
- Deploy URL: https://plainset.github.io/wild-nature-studio-demo/ — live,
  confirmed HTTP 200 on `/` and `/craft.html`, confirmed the corrected
  wolf-mount alt/caption and re-cropped `family.jpg` are present in the
  deployed HTML/assets (not just committed locally). Repo:
  `Plainset/wild-nature-studio-demo` (public), Pages source `master` branch,
  path `/`.
- Outreach state: **not drafted.** Gmail MCP tools confirmed
  permission-denied this session (`list_labels` call returned "Permission to
  use mcp__claude_ai_Gmail__list_labels has been denied"), matching the
  denial already logged for this session across WebSearch/WebFetch/
  chrome-devtools. There was no way to open the Gmail account switcher (that
  requires the denied chrome-devtools browser tool) to confirm
  vdvalkproductions@gmail.com is the active signed-in account, so per the
  task's explicit instruction, Gmail was not touched at all — no draft was
  attempted. Note for whoever retries: the studio's real domains are
  HTTPS-broken (see BUILD_BRIEF.md), so any outreach email must NOT link to
  wildnaturestudio.com over https:// when referencing their current site —
  use http:// or describe the issue in prose. Draft content (subject, hook,
  body) is fully specified in this task's brief and ready to use verbatim
  once Gmail access is confirmed.
- Flags for Alex:
  - Could not independently re-verify the Facebook "4.0★/4 reviews" figure logged in LEADS.md this session (Facebook blocked to plain curl, browser tool denied). Not used in site copy; only the Facebook page link itself (confirmed genuine via the business's own site) was used.
  - Only a partial address is publicly available (RG1, Reading, Berkshire) — no full street address found on the business's own site or its Wayback snapshot.
  - Phone number +44 792 772 8919 is newly found this session (was blank in LEADS.md's Contact column) — worth back-filling into LEADS.md. Dual-sourced (live HTTP contact page + Sept 2025 Wayback snapshot).
  - The 2026-07-15 independent review found a real image/copy mismatch (fabricated alt/caption text on `diorama-waterhole.jpg`) that the original builder's own QA pass missed, plus an advisory predation-diorama-in-background issue on `family.jpg`. Both are now fixed and re-verified this pass — see QA_REPORT.md for full detail. Worth noting for future builds: verify alt/caption text against the actual pixels, not just against what the filename/section implies.
  - **Outreach email was not drafted this session** — Gmail MCP tools are permission-denied (confirmed via a live `list_labels` call), so the account switcher could not be checked to confirm `vdvalkproductions@gmail.com` is active. Per instructions, Gmail was not touched at all rather than risk drafting from an unconfirmed/wrong account. Site is deployed and ready; only the draft step remains. Needs a session with working Gmail/browser tool access.
