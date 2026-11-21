// Build-time guard for the `financials` frontmatter block that every index page
// reads. Fails the build on anything that would make a ranking silently wrong.
//
//   node scripts/check-financials.mjs        (runs automatically before `next build`)

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DIR = path.join(process.cwd(), 'content/articles')
const errors = []
const warnings = []
const byCompany = new Map()
const withoutBlock = [] // published teardowns not yet exported from the database

const isNum = (v) => typeof v === 'number' && Number.isFinite(v)
const moneyValues = (s) =>
  [...s.matchAll(/(?:₹|Rs\.?\s?)\s?-?([\d,]*\d(?:\.\d+)?)\s*(Cr|crore|Lakh|lakh)?/gi)].map((m) => {
    const n = Number(m[1].replace(/,/g, ''))
    return m[2] && /^l/i.test(m[2]) ? n / 100 : n
  })
const close = (a, b) => Math.abs(a - b) <= Math.max(0.6, 0.006 * Math.max(a, b))

for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.replace(/\.mdx$/, '')
  const { data } = matter(fs.readFileSync(path.join(DIR, file), 'utf-8'))
  if (data.published === false) continue
  // Repetition guard: a hero tile should add a fact, not restate the title.
  // (The design review found headline figures stated 7 to 13 times above the first section.)
  for (const h of data.heroNumbers || []) {
    const v = moneyValues(String(h.value))
    if (v.some((x) => moneyValues(String(data.title || '')).some((t) => close(x, t)))) {
      warnings.push(`${slug}: hero figure ${h.value} repeats a figure already in the title`)
    }
    if (String(h.label || '').length > 32) warnings.push(`${slug}: hero label longer than 32 characters: "${h.label}"`)
  }
  const f = data.financials
  if (!f) {
    if (data.employerScore) withoutBlock.push({ slug, company: String(data.company || '').trim().toLowerCase() })
    continue
  }

  const where = `${slug}: financials`
  if (!/^FY20\d\d$/.test(f.period ?? '')) errors.push(`${where}.period must look like "FY2025" (got ${JSON.stringify(f.period)})`)
  if (!['consolidated', 'standalone'].includes(f.basis)) errors.push(`${where}.basis must be "consolidated" or "standalone"`)
  for (const k of ['revenueCr', 'patCr', 'prevPatCr', 'netWorthCr']) {
    if (f[k] !== undefined && f[k] !== null && !isNum(f[k])) errors.push(`${where}.${k} must be a number or null (got ${JSON.stringify(f[k])})`)
  }
  if (f.patCr == null) warnings.push(`${slug}: patCr is null, company is not counted in the indexes`)
  if (isNum(f.revenueCr) && f.revenueCr < 0) errors.push(`${where}.revenueCr is negative`)
  // A margin beyond +/-1000% almost always means a unit slip (lakh vs crore) or a wrong line.
  if (isNum(f.revenueCr) && isNum(f.patCr) && f.revenueCr > 0 && Math.abs(f.patCr / f.revenueCr) > 10) {
    warnings.push(`${slug}: PAT is ${Math.round((f.patCr / f.revenueCr) * 100)}% of revenue, check units`)
  }

  const key = String(data.company || '').trim().toLowerCase()
  if (!byCompany.has(key)) byCompany.set(key, [])
  byCompany.get(key).push(slug)
}

for (const [company, slugs] of byCompany) {
  if (slugs.length > 1) {
    errors.push(`"${company}" has financials in ${slugs.length} articles (${slugs.join(', ')}). Keep it on the primary teardown only, so the company is counted once.`)
  }
}

// A teardown whose company has no `financials` anywhere is missing from every index.
// (Follow-up pieces about an already-counted company are expected to have none.)
for (const { slug, company } of withoutBlock) {
  if (!byCompany.has(company)) {
    warnings.push(`${slug}: not in the indexes yet. Load its filing into the database, then run ` +
      `\`python -m dataextraction.export_financials --add ${slug}:FY20XX:<standalone|consolidated> --write\` (see CLAUDE.md)`)
  }
}

for (const w of warnings) console.warn(`  warn  ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`  error ${e}`)
  console.error(`\ncheck-financials: ${errors.length} error(s)`)
  process.exit(1)
}
console.log(`check-financials: ${byCompany.size} companies, ok`)
