# UnpopularVoice — Article Craft Rules

When writing or editing articles in `content/articles/` and comparisons in `content/comparisons/`, follow the rules below. These are validated by repeated user feedback. Apply all of them before publishing.

## 1. Title

**Lead with contradiction or ratio, not a stat list.** A title that lists three numbers ("Revenue X, Loss Y, Cost Z") passes review but doesn't travel. Use one of these structures:

- "[Company] [verb-ed] X. [Verb-ed] Y." (contradiction) — example: Zeta Is Profitable. But 33% Smaller.
- "[Company] Spent ₹X to Earn ₹Y." (ratio) — example: UpperCase Spent ₹144 to Earn ₹100.
- "[Company] [Made/Lost/Has] X. [Made/Lost/Has] Y." — example: Snapmint Borrowed ₹288 Cr. Made ₹6.8 Cr Profit.
- "[Company]'s [thing] [verb]ed. [Other thing] [verb]ed [adverb]." — example: Unacademy Is Smaller. Losses Fell Anyway.

**Calibrate the title to the evidence.** A ratio-based title like "Pays ₹114 to Earn ₹100" overstates the economic conclusion when accounting classification could explain the gap. If the audit shows the data but doesn't explain the cause, prefer factual phrasing like "Reported COGS Exceeds Revenue. The Filing Doesn't Show Why."

## 2. Opening (first two lines)

Two short sentences, no explanatory clauses. Each line should be readable as a standalone tweet.

Validated examples:
- "Zeta lost ₹293 Cr in revenue. It is still profitable."
- "SuperTails has ₹23 lakh in cash. It does ₹120 Cr in revenue."
- "For every ₹100 UpperCase earned, it spent ₹144."
- "Unacademy's revenue fell. Its losses fell faster."

## 3. Viral line

Every article needs at least one screenshot-worthy line. Place it in the 30-second summary or as a `<SignatureLine>`. Validated structures:

- "[Company] is not [building / scaling / fixing] X. It is [Y]." — Unacademy didn't fix growth. It fixed costs.
- "[Positive thing] survived. [Other thing] didn't." — Profit survived. Scale didn't.
- "[X] isn't here. [Y] is." — Profitability isn't here. Control is.

If you can't write one, the central thesis isn't sharp enough. Find it first.

## 4. Section length

Most sections are 10-20% too long in the first draft. Tighten by:

- Compressing 3-scenario explanations to one bold lead per scenario.
- Cutting the second "the audit doesn't disclose..." caveat. One is enough.
- Removing brand-name examples unless load-bearing.
- Merging an opening paragraph with the first bold sub-bullet, so the section starts with a number.

## 5. Closing line

Replace softeners with consequence lines. Avoid: "Not a crisis", "It depends on FY2026", "Time will tell".

Use:
- "This model works only if [specific condition]."
- "[Number] is not a cushion. It is a constraint."
- "[Subject] is [verbing] slower than [other subject]."

## 6. Calibration — sharpness PLUS hedged claims

This is the most-flagged issue across recent reviews (Captain Fresh, Fresh2Home, Scaler). The strongest articles preserve sharp framing AND calibrate certainty to evidence.

When the audit alone proves a claim, state it plainly. When the audit shows a pattern with multiple plausible explanations, hedge the explanation, not the data:

- "The standalone accounting structure presents a gross-cost gap." (data) vs "The filing does not disaggregate the cause." (causation hedge)
- "OCF worsened by ₹55 Cr." (data) vs "The deferred-revenue mechanism is the most likely directional explanation, but other working-capital movements likely contribute." (causation hedge)
- "The first stage of a turnaround." (calibrated) vs "The turnaround." (overstated)

**Phrasings that work:**
- "The filing is consistent with [X] being a material contributor."
- "The most likely directional explanation, but not the only one."
- "The standalone numbers don't fully decompose [Y]."
- "The cash side has not yet caught up."

**Phrasings to avoid:**
- "The cash flow disagrees" (when "hasn't caught up" is more accurate)
- "Imminent runway crisis" (when entity is parent-funded)
- "No amount of [X] can fix this" (too absolute)
- "The unit economics are upstream of operations" (only valid if audit conclusively shows it)

**Tone calibration ratio:** Aim for ~50% caution / 50% operational acknowledgement on negative articles. If the article reads 70/30, find bright spots in the filing (foreign exchange earnings, marketing efficiency, ratios that improved) and surface them.

**The "inference as proof" trap.** When the article uses arithmetic to infer something the audit doesn't directly disclose, name it as inference. Two specific cases:

- **Standalone-minus-consolidated math is not segment-level economics.** When standalone P&L differs from consolidated P&L, the residual reflects consolidation adjustments (transfer pricing, intercompany eliminations, shared overhead, IP/licensing flows). It is not a clean read on individual subsidiary performance.
- **Working-capital decomposition is partial.** When OCF differs from PBT/PAT, multiple working-capital movements drive the gap. Name the most likely directional driver; don't claim precise weights.

**Speculation length rule.** Once an article admits "the audit doesn't disclose the cause," the speculation that follows should be SHORT and probabilistic. A 5-bullet list works. A 6-paragraph essay doesn't.

**Tone discipline — avoid editorialised verbs.** Specific verbs drift from analytical to dramatic and have been flagged:
- "flatters" → use "compresses" or "lifts the reported figure"
- "hides" → use "bridges the two readings"
- "harder to read positively" / "the audit reads as ..." → present the data; let the reader form the read
- Don't overstate strategic conclusions. "Three of three acquired entities show underperformance signals" is evidenced. "The acquisition strategy has not translated to group economics" is broader than the audit supports.

**Evidence vs interpretation separation.** When you state both an evidence point and an interpretation, signpost which is which. The evidence point belongs in a `<VersusBlock>`; the interpretation belongs in a `<TakeawayCard>`. Keeping them visually distinct makes the article more defensible.

**Statutory vs economic duality.** When the reported P&L number diverges from the underlying operating result, present them as two named `<VersusBlock>` rows: "Statutory view (reported PAT)" and "Economic view (operating loss before exceptional items)" with FY24 vs FY25 values in each. Add a one-paragraph bridge naming what reconciles them (exceptional items, write-backs, tax credits, deferred revenue). Both readings are accurate; they describe different things. See feedback_statutory_vs_economic memory and the `/vedantu-fy2025` and `/myntra-fy2025` articles for the model.

## 7. Every analysis-style article needs a mechanism / WHY section

Articles that only describe outcomes from the filing read as company analysis. The strongest articles include a section asking "Why is the audit showing this pattern?" rather than only describing it.

For each article, identify the most surprising number in the filing. Write a section titled with the question that number raises:

- Fresh2Home (COGS > revenue) → "Why Would Reported COGS Exceed Revenue?"
- Scaler (revenue declined) → "Why Did Revenue Shrink?" + "What Happens to Edtech Accounting When Growth Slows?"
- Captain Fresh (working-capital ratios collapsed during hypergrowth) → centred analysis on the ratio compression as operational maturation.

The mechanism section should:
1. Name the question.
2. List 3-5 plausible mechanisms.
3. Note which is most consistent with the filing (calibrated, not deterministic).
4. Acknowledge what the audit does and doesn't disclose.

When the mechanism is shared across an entire category (cohort-subscription edtech, foreign-subsidiary D2C), add a category-level framing section. This is the leverage move from "company analysis" to "category-defining insight."

Skip the section only for clean working-model articles where the audit shows expected unit economics (Porter, Plum, Zerodha).

**Demand-side WHY is a separate required section when revenue grew slowly.** When revenue growth is materially below category benchmarks, add a parallel section that names plausible demand-side drivers (category fatigue, ROI perception, pricing resistance, conversion-funnel softening, competition). The cost-cut section explains HOW the loss compressed; the demand-side section explains WHY revenue did or didn't grow. Both are needed.

**For acquisition-built groups, add an "organic vs acquired" section.** When the entity has material goodwill and a portfolio of acquired businesses (upGrad, Mensa Brands, Purplle, Captain Fresh), add a section asking "How much of [Company] is actually organic anymore?" Compare standalone growth rate to consolidated growth rate; note what unlisted-company AOC-4 filings DO and DON'T disclose at segment level. See feedback_acquisition_built_groups memory for the template.

**Anchor article cross-references.** When a category-level mechanism has been thoroughly developed in an earlier article (cohort-subscription accounting in `/scaler-fy2025`, capital-efficiency-during-hypergrowth in `/captainfresh-fy2025`, goodwill-impairment in `/brndme-fy2025`), cross-reference the anchor article instead of re-deriving the framework. Build a corpus, not isolated pieces.

## 8. Subsidiary entity reads — don't mistake structure for distress

When the audited entity is a subsidiary of a foreign parent or a fellow subsidiary in a holding group, negative net worth and thin standalone cash are often accounting representations of intercompany funding, not financial distress.

Before flagging negative net worth as a risk:
1. Check whether negative reserves are matched by an "Other Current Liabilities" sub-line of similar magnitude (intercompany advances).
2. Check the related-party transactions schedule for the immediate and ultimate holding companies.
3. Read the going-concern statement.

If the structure is parent-funded, write:
- "Structurally an intercompany funding representation against a parent-level receivable, not a distress signal."
- "Standalone cash is ₹X Cr; runway is shaped by parent-level funding cadence rather than this line in isolation."

Don't write:
- "The entity is technically insolvent."
- "Net worth is exhausted."

## 9. Cohort-based subscription accounting

Edtech, audio platforms, course-fee businesses: OCF and P&L can diverge for extended periods. During growth, deferred revenue accumulates and OCF flatters the P&L. During slowdowns, the cycle reverses.

When you see OCF diverging from P&L in a subscription business, name the cycle and don't call one number "correct":
- "In cohort-based subscription businesses, OCF can diverge from the P&L for extended periods in either direction."
- "A negative OCF in a year of accounting profitability does not invalidate the profitability improvement."

For category-level framing on Indian edtech, see Scaler article's "What Happens to Edtech Accounting When Growth Slows?" section as the model.

## 10. Writing-craft maturation — restraint, sequencing, trusting the reader

After accuracy and calibration are solved, the next ceiling on UV article quality is craft. Apply these on every article that uses the statutory-vs-economic duality, transfer pricing, foreign subsidiaries, or other multi-entity readings.

**a. Explain mechanics BEFORE interpretation.** In any section, present the accounting mechanic / what the audit shows FIRST, THEN the implication. The reader should be able to validate the data point before the analytical claim is built on top of it.

- Bad: "GIDS's profit fell 55% because the parent reset transfer pricing to extract more value from India."
- Good: "GIDS's PAT fell 55%. The audit attributes this to a 'change in revenue arrangement with group company': license fees grew 13x. The reset is the mechanism. What it implies for FY2026 economics depends on whether the new methodology holds."

**b. Avoid "economic reality" framing drift.** Transfer pricing IS economic reality. Jurisdictional allocation IS economic reality. Calling one read "real" and the other "accounting" delegitimises the audit framework UV uses. Both readings are accurate; they describe different things.

- Phrasings that work: "One defensible read of operating performance; the statutory view is the other." / "What the audit reports vs what the operating activity did." / "Both readings are accurate; they describe different things."
- Phrasings to avoid: "The real number underneath." / "The accounting hides what's actually happening." / "The economic reality vs the reported figure."

**c. "What the standalone DOES capture / DOESN'T capture" opening discipline.** Default opening structure for any acquisition-built / foreign-subsidiary / transfer-priced article. Names what the filing CAN and CANNOT tell us before the analysis starts. One of the strongest signals of analytical maturity.

**d. Trust the reader — shorten over expand.** Mature financial readers don't need every term defined twice, every implication spelled out, every contradiction telegraphed. Three concrete moves:
- Cut "and what this means is..." lead-ins. State the implication once; don't bridge into it.
- One example per principle, not three. Multiple plausible drivers go in a tight 3-5 bullet list, not a paragraph each.
- End sections one sentence earlier than feels comfortable. The reader closes the loop.

**e. The "structural read" TakeawayCard pattern.** Each major analytical section should consider closing with a TakeawayCard that compresses the section's thesis to 1 headline + 1 supporting body sentence. Reduces cognitive load. Don't overuse — 1-2 per article max. Reserve for sections where the analytical step is non-trivial (mechanism explanations, statutory-vs-economic bridge, capital-action divergence).

**f. The "constrain claims" reflex — credibility marker.** Phrasings like "The audit does not disclose...", "likely reflects...", "may produce...", "What the filing supports clearly is direction. What it doesn't conclusively prove is..." are NOT weakness markers. They signal the analyst knows the difference between data and interpretation. Use them when claiming inference.

**g. UV's strategic niche — Forensic startup accounting interpretation.** Distinct from startup gossip, fundraising news, founder PR, and hot takes. The strongest articles lean into: transfer pricing, contingent consideration, deferred revenue, goodwill impairment, ESOP distortion, intercompany flows, standalone vs consolidated, statutory vs economic. When choosing what to write about an entity, prioritise topics where these mechanics produce a non-obvious finding. That's the moat.

**Anchor articles where these principles execute well:**
- **Google Pay (GIDS)** — transfer pricing, jurisdictional framing, statutory-vs-economic bridge.
- **Vedantu** — exceptional gain decomposition, standalone vs consolidated.
- **PhonePe** — ESOP charge separation from operating economics.
- **Razorpay** — non-cash exceptional bridge, restructured-entity reading.
- **Plum** — clean working-model framing without overstatement.
- **Captain Fresh (revised)** — calibrated subsidiary-funding interpretation.

## 11. Forensic positioning — trust the filing more than the narrative

The strategic ceiling for UV writing-craft. The user has explicitly named this as the direction. The strongest finance writing doesn't attack, doesn't hype, simply decomposes the structure. The Ola FY2025 article is the anchor for this positioning.

**The forensic vs bearish axis:**

- Forensic ✓ "The audit shows X. The filing does not disaggregate the cause."
- Bearish ✗ "The accounting is hiding what's actually happening."
- Forensic ✓ "One defensible read of operating performance; the statutory view is the other."
- Bearish ✗ "The real loss is bigger than the company admits."
- Forensic ✓ "What the filing supports clearly is direction. What it doesn't conclusively prove is the precise mechanism."
- Bearish ✗ "This proves the company is in trouble."

**The "reported X ≠ underlying X" rule.** When a headline figure could let a casual reader infer something stronger than what the audit proves, name the distinction explicitly. Don't let the reader make an inference the filing doesn't authorise.

- The Ola case: filing supports "reported revenue fell 47.5%." It does NOT support "Indian ride volume on the Ola platform fell 47.5%." Without the distinction, the reader builds a story the audit does not authorise.
- Apply whenever: revenue (which is a function of recognition pattern, volume, pricing, fees, subscriptions), profit (which is a function of one-time items, deferred tax, exceptional gains), GMV inferred from commission, segment performance inferred from standalone-minus-consolidated math.

**Historical-context section for business-model-evolved entities.** When the revenue-recognition pattern has shifted over a multi-year window, include a short section explaining how reported revenue is constructed today vs how it was constructed earlier. Required for: ride-hailing, payments, e-commerce marketplaces, subscription platforms, foreign-subsidiary entities with transfer-pricing methodology resets.

Template: brief recognition history, audited revenue-line breakdown, named list of drivers affecting reported figure, closing distinction (filing supports X; does not disaggregate Y), followed by a `<TakeawayCard variant="light">` if the distinction is non-trivial.

**EmployerScore tone discipline.** State financial deterioration plainly; acknowledge structural mitigants; avoid finality language. "Going concern flagged" is OK; "doomed" is not. "First cash-loss year in recent history" is OK; "on the brink of collapse" is not. Risk flags must be traceable to specific audit lines.

**The annual / cumulative / forward three-way framework.** For mature entities where multi-year history matters (Amazon, Flipkart, capital-intensive platforms, large foreign subsidiaries), structure The Two Reads of the P&L as a three-VersusBlock sequence: annual view (direction), cumulative view (cost of getting here), forward signal (what management itself expects via DTA recognition, capital infusion cadence). The Amazon FY25 article is the anchor. Each block answers a different question; together they prevent the casual reader from collapsing direction, history, and expectations into a single interpretation.

**Strategic-context section for infrastructure-investment entities.** When cumulative losses correspond to deliberate infrastructure investment (Amazon India, Flipkart, capital-intensive platforms, foreign-subsidiary entities with strategic parent capital deployment), add a "What the Cumulative Capital Funded" section before the casual reader concludes "failure." Name the visible infrastructure (logistics density, technology platform, ecosystem build), tie each to specific audited cost lines, acknowledge that accounting answer ("loss") and strategic answer ("build cost") differ without choosing between them. Close with: "The audit records the accounting fact; the strategic interpretation sits outside the filing."

**"Operational break-even" precision.** "Approached operational break-even" overstates when depreciation remains massive (economic, not just accounting), logistics economics are structurally heavy, or the cost base has not changed shape. Prefer "approached reported accounting break-even at the standalone [marketplace/payments/services] layer." Add "the annual P&L improvement is real, but the underlying cost structure has not changed shape" where applicable.

**DTA non-recognition under Ind AS 12 is conservatism, not pessimism.** Critical calibration. For long-dated accumulated losses in large marketplaces and capital-intensive entities, non-recognition is fairly standard practice. A single loss-narrowing year usually does not constitute sufficient positive evidence for DTA recognition. Lead with: "Non-recognition is conservative accounting under Ind AS 12, not necessarily a negative operating forecast." Avoid: "Management lacks confidence" or "a more confident management would have recognised."

**Marketplace working-capital cycle.** Marketplaces and payment platforms structurally operate with negative working capital. Cash from buyers settles ahead of payouts to sellers and logistics providers. As the marketplace grows, payables expand alongside revenue and generate operating cash flow that exceeds reported earnings. When framing the OCF-vs-PAT gap: name this as "part of the marketplace model rather than an artificial boost to OCF." Caveat durability: "What the filing does not show is sustainability at zero growth, where the working-capital tailwind compresses or reverses." Apply to: marketplaces, payment platforms with merchant float, any entity that collects cash before paying suppliers. Don't apply to: inventory-led models, service businesses that pay vendors before receiving from customers.

**Compression discipline — the single biggest improvement left.** The current ceiling on UV article quality is length. The same insight tends to appear 3-4 times across sections (in the body, in a TakeawayCard, in EmployerScore notes). Target 25-30% length reduction on every draft.

Section-count rule: 3 body sections beyond the 30-second summary and entity context. The Furlenco FY25 post-revision structure is the anchor:
- Operational [turnaround / shift / story] — with the key forensic caveat (D&A, principal-vs-agent, etc.) folded inside, not as a separate section.
- [Capital / Investment / Funding] Restructuring — all capital events, debt repayment, corporate-form changes, governance moves combined.
- What Remains Unresolved — short forward-looking, 3-4 bullets, not 5 paragraphs.

Framing-device reduction (~50% cut). These self-aware phrases have become templated:
- "The audit does not need to interpret" — drop entirely.
- "The structural read" — only as TakeawayCard eyebrow, not in body prose.
- "The forensic question" — drop; replace with "the open question."
- "What the filing supports clearly" / "What it does not conclusively prove" — keep maximum one per article.

Inference distance discipline. Speculation about "preparing for IPO" or "listing intent" should be softened to "the filing does not disclose specific intent" unless the audit explicitly states the intent. Stay tight to the filing. The further analysis moves from filing text to inference, the weaker the article gets.

Repetition test before publishing: take any analytical line in the article (e.g. "cost base shrank while revenue grew"). If it appears in 3+ forms across body + TakeawayCard + EmployerScore + risks list, cut it down to 1-2 forms.

**Comparative forensic interpretation is UV's strongest moat.** The user has explicitly named this as the long-term defensible positioning: not generic startup audits, not burn analysis, not profitability commentary. The differentiation is teaching how identical metrics mean different things across entity structures (standalone vs consolidated, principal vs agent, operating company vs holding company). When multiple comparable-period audits are available for companies in the same category with structurally different recognition or entity architecture, write the comparison piece. The teaching frame is the moat. Anchor: `/compare/rapido-vs-uber-vs-ola`.

**The third-revision compression pass.** After the three-section spine (rule 11) lands, run a second compression pass that:
- Removes explanatory paragraphs the following content already proves. If a paragraph sets up an insight that the next paragraph delivers, cut the first.
- Avoids overloading any single section. If a section is doing 5+ distinct analytical jobs (operating + OCI + impairment + loans + holding-company forensics), some material is for a separate article.
- Lets dense paragraphs breathe. Split paragraphs that combine mechanism + arithmetic + caveat into separate ones.
- Targets 15-20% further word reduction beyond rule 11.

The reasoning the user articulated: "Earlier articles needed explicit explanation because the analysis itself was simpler. Now the analysis is stronger. So the explanatory scaffolding can reduce."

## What to never write

- **Em dashes (—).** Anywhere, in any surface. Commas, colons, or parentheses only. After every editing session run `grep -rln "—" content/ components/ app/ lib/`; result must be empty. Three sentinel-glyph fallbacks use hyphen `-`, not comma (see reference_color_canonical memory for the list).
- **Filing jargon in prose.** No "AOC-4", "MGT-7", "XBRL", "MCA filings", or "filed [date]". Source citations belong in FactCheck/Verification blocks only. Methodology references belong in the `dataSource` frontmatter field.
- **Generic titles.** "Grew fast, still losing money" describes 5,000 companies.
- **Stat-listing in the opening.** "Revenue was X. Loss was Y." needs a third sentence that tells the reader what to feel.
- **Inflated inference.** "Consistent with impairment" not "likely impairment" when the audit doesn't say so.
- **"Effectively debt-free" with debt remaining.** Use "largely debt-free" or "near zero debt" if any meaningful debt sits on the balance sheet.

## Pre-publication sanity checks

Before publishing, confirm:

1. **Entity sanity.** AOC-4 explicitly discloses subsidiary status. If the company is a subsidiary, write about the parent instead, OR write about the entity with explicit framing about what the standalone captures vs the group. Reconcile audited net worth against publicly-reported capital raises.
2. **Frontmatter validity.** `verdict` is `solid | watch | caution`. `profitability` is one of `Achieved | Loss-Narrowing | Weak | Loss-Deepening`. `stability` is `Strong | Watch | Caution`. Anything outside these breaks rendering silently.
3. **Component names.** It is `<EmployerScore>`, not `<EmployerScoreCard>`. It is `<SignatureLine>`, not `<Signature>`. Mismatched names crash the page in production.
4. **MDX prop patterns.** Object-literal JSX props (`a={{...}}`) DO NOT parse in next-mdx-remote/rsc. Use flat string props or tuple arrays. See feedback_mdx_props memory.
4a. **MDX component registration.** When using TakeawayCard, ContrastRow, SplitView, JargonKey, or VersusBlock in an article, confirm the component is in the `mdxComponents` map in `app/[slug]/page.tsx` (article route). Comparison route at `app/compare/[slug]/page.tsx` has its own map. The build passes either way; the runtime error appears only on first request as `Expected component '<Name>' to be defined`.
5. **Em dash sweep.** `grep -rln "—" content/ components/ app/ lib/` must return zero matches before deploy.
6. **Calibration self-pass.** Re-read each definitive claim in the article. For each one, ask: does the audit conclusively prove this, or does it suggest it? Hedge the suggestions.
7. **Mechanism check.** If the article describes outcomes without exploring causes, add a "Why?" section.
8. **Five-fix self-pass.** Title, opening, viral line, section trim, closing punch. If any flunks, fix before deploying.
9. **`relatedArticles` slugs exist.** Verify against `content/articles/` filenames.
10. **Deployment verification.** After `vercel --prod`, look for `readyState: READY` AND `Aliased: https://unpopularvoice.com` in the output. The JSON tail alone doesn't confirm a successful deploy. Curl-verify the live page after.
11. **Index data exported from the database.** A new teardown is NOT counted or ranked in the Profitability Index, Jobs Index, Employer Check or home stats until its `financials` block exists. Load the filing into the database and run the export (see "Index data: database to article" below). `npm run build` prints `warn <slug>: not in the indexes yet` until this is done; treat that warning as a publish blocker for primary teardowns.

## Index data: database to article

Every index page reads ONLY the `financials:` frontmatter block. It never parses heroNumbers, prose or tables. The block is generated, never hand-typed:

1. **Load the filing into the database** (PostgreSQL `unpopularvoice`, from the parent repo with the venv active):
   - Put the company's zips in `data/<Brand>/<date>/`. AOC-4 PDFs embed the XBRL instance (sometimes UTF-16); unpack the latest year's instance into `data/<Brand>/<date>/extracted/zip_<N>/`, then `python -m dataextraction.main scan` and `python -m dataextraction.main process-one <Brand>`.
   - If no XBRL exists locally, FileSure can serve the filed figures (unlock only when AOC-4 years are listed); load them with `python -m dataextraction.pipeline.filesure_loader <dir-of-json>`.
   - Check the row: `select * from v_financials_canonical where entity_cin = '<CIN>' order by period_end;`
2. **Export into the article** (frontmatter only; nothing else changes):
   - New article: `python -m dataextraction.export_financials --add <slug>:<FY2025>:<standalone|consolidated> --write`, using the year and basis the article leads with.
   - Refresh all articles after any database change: `python -m dataextraction.export_financials --write`.
   - The article's `cin` must be the filing entity's CIN (or add an `ENTITY_OVERRIDE` entry in the export script for articles without one).
3. **Reconcile before publishing.** The article's headline revenue, PAT and net worth must match the exported block. If they differ, the filing wins: fix the article, not the block.
4. **One company, one block.** Follow-up pieces (debt registers, group maps, founder comp) get no block, so the company is counted once. Add their slug to `SECONDARY` in `dataextraction/export_financials.py`. The prebuild check fails if two articles of the same company carry a block.

## Corrections: never change a published figure silently

When a published article's figure, label or headline turns out to be wrong, fix it AND add a dated entry to its frontmatter (articles and comparisons alike):

```yaml
corrections:
  - ["14 November 2026", "An earlier version gave X as ₹A Cr. The audited figure is ₹B Cr. The headline was updated."]
```

Say what was wrong and what the accounts show, in one or two plain sentences (no filing jargon, no em dashes). The note renders at the foot of the article, the byline date becomes "Corrected: <date>", dateModified and the sitemap move to that date, and the entry is listed on /corrections automatically. Wording or layout changes that alter no fact are not corrections. Policy text lives on /editorial-standards; don't add promises there that the site doesn't keep.

Definitions used by every index: profitable = `patCr > 0`; net worth = equity attributable to owners where filed; balance-sheet buffer = net worth / annual loss (a ratio at year-end, not a forecast; foreign parents' support does not count because it is not in Indian filings).

## Spectrum thinking

Every company falls into one of these categories. Identify which before drafting:

- 🟢 **Working models** — profitable, self-funding (Dhan, Zerodha, Porter, BookMyShow, Infra.Market, Plum). Hook: ecosystem contrast.
- 🟡 **Scaling models** — profitable, deploying capital (MoneyView, Snapmint). Hook: profitability + structural debt dependency.
- 🔵 **In-progress models** — loss-narrowing, unit economics improving (KukuFM, GIVA, Licious, OneCard, UpperCase, SuperTails, Captain Fresh). Hook: cost-cuts vs revenue scale, working-capital efficiency improving underneath.
- 🔴 **Broken / early models** — pre-revenue, failed unit economics, or persistent structural gross-margin issues (Sahi, Rozana, Fresh2Home). Hook: capital raised vs revenue earned, or the WHY of the gross-margin gap.
- ⚫ **Restructuring models** — profitable-but-shrinking, or loss-narrowing-but-revenue-falling (ShareChat, Zeta, Unacademy, Scaler, Mensa). Hook: contraction done well; cost discipline over growth.

The category determines the angle. A working-model article needs ecosystem contrast. A restructuring-model article needs the "smaller but functional" framing AND the demand-side why. A broken-model article needs the "what was raised vs what was earned" contrast PLUS a mechanism section.

## Visual components for prose-heavy sections

Use these instead of long paragraphs in comparison MDX and analysis articles:

- `<VersusBlock>` — single-metric A vs B with optional direction arrow and tone color
- `<SplitView>` — narrative A vs B with bold headline, body paragraph, color tone
- `<ContrastRow>` — two short claims side by side, neutral (black rule, grey labels; red and green are reserved for a figure's sign)
- `<TakeawayCard>` — magazine-style hero pull-out (dark or light variant)
- `<JargonKey>` — collapsed glossary ("Terms used here: ...") for abbreviations (use when 3+ technical abbreviations appear)

All require flat string props or tuple arrays (object literals don't parse in MDX).

## Build & deploy

After every article change:

```sh
# 1. New teardown only: put its figures in the indexes (from the parent repo, venv active)
python -m dataextraction.export_financials --add <slug>:<FY2025>:<standalone|consolidated> --write
# 2. Build (prebuild runs scripts/check-financials.mjs) and deploy
npm run build && vercel --prod
```

The build must not print `warn <slug>: not in the indexes yet` for the article you are publishing.

Then update `public/llms.txt` with the new entry (slug + title).

Verify deployment: look for `readyState: READY` and `Aliased: https://unpopularvoice.com` in the Vercel CLI output. Then `curl -s https://unpopularvoice.com/<slug>` to confirm HTTP 200, the new title rendering, and zero em dashes.
