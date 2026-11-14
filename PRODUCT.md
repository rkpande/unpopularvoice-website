# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four confirmed audiences, all reading the same articles from different angles:

- **Job seekers and startup employees**: checking whether a company is a safe place to work or join (Employer Check, Startup Jobs, the EmployerScore block on every article).
- **Investors and finance people**: angels, VCs, analysts who want audited numbers instead of press-release figures.
- **Founders and operators**: benchmarking peers, unit economics, and category mechanics.
- **Curious general readers**: arrive from LinkedIn or X via a contradiction headline or a shareable line.

Inferred, not confirmed: because traffic is search and social led, a large share of first visits land directly on a single article, often on a phone.

## Product Purpose

UnpopularVoice (unpopularvoice.com) publishes financial teardowns of Indian startups built from audited annual filings. Each piece extracts revenue, profit, operating cash flow, debt, and cost structure from the filing itself, then explains what the numbers mean and why they look the way they do.

Current success metric: **search and social traffic**. Articles are built to rank (seoTitle, FAQ frontmatter, sitemap, llms.txt) and to travel (contradiction titles, signature lines, LinkedIn creatives).

## Positioning

Forensic, not bearish. "Trust the filing more than the narrative." The site distinguishes the reported number from the underlying operating result, names the mechanism behind a surprising figure, and calibrates certainty to what the filing actually proves. Press releases and founder narratives are the thing being checked, not the source.

## Operating Context

- Content lives as MDX in `content/articles/` (about 100 articles) and `content/comparisons/`; frontmatter carries tldr, heroNumbers, realityScore, employerScore, and FAQ items.
- Data comes from the extraction pipeline in the parent repo (`../dataextraction`) reading filings stored under `../data/`.
- Distribution: Google search, LLM crawlers (`public/llms.txt`), LinkedIn posts with custom creatives (`../linkedin_assets/`, Figma file for social creatives).
- Deployed on Vercel from this directory.

## Capabilities and Constraints

- Next.js 14 App Router, MDX via next-mdx-remote (rsc), Tailwind CSS with typography plugin.
- Surfaces: home, article pages (`/[slug]`), articles index, comparisons (`/compare`), sector pages, author pages, Employer Check, Profitability Index, Reality Check index, Startup Jobs, methodology, subscribe, generated OG images (`/og`).
- Scoring systems: realityScore (three 1 to 10 dimensions) and employerScore (five labelled dimensions plus a solid / watch / caution verdict). Methodology is public at `/methodology`.
- MDX components take flat string props or tuple arrays only; object-literal JSX props do not parse.
- Editorial rules live in `CLAUDE.md` and are binding for content work.

## Brand Commitments

- Name: **UnpopularVoice**. Bylined authors live in `lib/authors.ts` (currently two: ParthSarthy P and Anjali M.).
- Voice: neutral, surgical, calibrated. Sharp framing, hedged causation. No cheerleading, no doom.
- Audited numbers only. Never fabricate figures, quotes, or claims.
- No em dashes anywhere user-visible (default substitute: comma).
- No filing jargon (form names, "MCA filings", "filed [date]") in article prose; only inside fact-check / verification fields.
- Color semantics: green-700 means positive, red-600 means negative, brand-red is reserved for brand identity and never signals a negative number. Verdict chips use their own distinct palette.

## Evidence on Hand

- About 100 published articles and 4+ comparisons (see `public/llms.txt` for a list).
- Existing index pages and scoring data derived from article frontmatter.
- LinkedIn creatives in `public/creatives/` and `../linkedin_assets/`.
- No testimonials, press mentions, subscriber counts, or traffic figures have been supplied. Do not invent them.

## Product Principles

1. **The filing is the authority.** Every number on the page traces to an audited figure; design never implies precision the source lacks.
2. **Separate evidence from interpretation.** Data and the read on it stay visibly distinct, so the reader can disagree with the read without doubting the data.
3. **One page must stand alone.** Most readers arrive cold on a single article from search or social; it must deliver the thesis, the proof, and a reason to read the next piece without context.
4. **Built to travel.** The headline, the hero numbers, and the signature line should each survive as a screenshot.
5. **Build a corpus, not isolated pieces.** Cross-reference anchor articles, indexes, and comparisons so each visit can deepen.
