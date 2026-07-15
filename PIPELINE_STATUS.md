# Pipeline Status

Operational handoff only. `LEADS.md` and `OUTREACH_LOG.md` remain the source of truth.

- Current phase: Fix phase complete (2026-07-15). Both the blocking and
  advisory issues from the 2026-07-15 independent review are fixed and
  re-verified — see QA_REPORT.md "Fix Pass Verification" section. QA verdict
  is now PASS. Proceeding to Deploy phase.
- Last trusted commit: (see `git log -1` after the fix commit)
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
- Next exact action: Deploy — new public GitHub repo `wild-nature-studio-demo`
  under Plainset, push, enable Pages, confirm live URL, then draft outreach
  per AGENTS.md step 7 (lead with the SSL/HTTPS handshake failure as the
  verified observation hook — see BUILD_BRIEF.md Pitch Hook).
- Deploy URL: pending (this session, immediately after this status update).
- Outreach state: pending. Note: the studio's real domains are HTTPS-broken
  (see BUILD_BRIEF.md), so any outreach email must NOT link to
  wildnaturestudio.com over https:// when referencing their current site —
  use http:// or describe the issue in prose.
- Flags for Alex:
  - Could not independently re-verify the Facebook "4.0★/4 reviews" figure logged in LEADS.md this session (Facebook blocked to plain curl, browser tool denied). Not used in site copy; only the Facebook page link itself (confirmed genuine via the business's own site) was used.
  - Only a partial address is publicly available (RG1, Reading, Berkshire) — no full street address found on the business's own site or its Wayback snapshot.
  - Phone number +44 792 772 8919 is newly found this session (was blank in LEADS.md's Contact column) — worth back-filling into LEADS.md. Dual-sourced (live HTTP contact page + Sept 2025 Wayback snapshot).
  - The 2026-07-15 independent review found a real image/copy mismatch (fabricated alt/caption text on `diorama-waterhole.jpg`) that the original builder's own QA pass missed, plus an advisory predation-diorama-in-background issue on `family.jpg`. Both are now fixed and re-verified this pass — see QA_REPORT.md for full detail. Worth noting for future builds: verify alt/caption text against the actual pixels, not just against what the filename/section implies.
