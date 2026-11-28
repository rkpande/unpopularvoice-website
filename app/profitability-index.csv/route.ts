import { getAllArticles } from '@/lib/articles'
import { getFinancials, onePerCompany } from '@/lib/financials'

const SITE_URL = 'https://unpopularvoice.com'
export const revalidate = 3600

// The Profitability Index as a CSV: one row per company, the audited figures
// each teardown leads with (exported from the database). Free to reuse with
// attribution; it is what researchers and journalists cite.
const cell = (v: unknown) => {
  const s = v === null || v === undefined ? '' : String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export async function GET() {
  const rows = onePerCompany(getAllArticles())
    .map((a) => ({ a, f: getFinancials(a) }))
    .filter((r) => r.f && r.f.patCr !== null && r.f.patCr !== undefined)
    .sort((x, y) => (y.f!.patCr ?? 0) - (x.f!.patCr ?? 0))
  const header = [
    'company', 'fiscal_year', 'basis', 'revenue_from_operations_inr_cr', 'profit_after_tax_inr_cr',
    'prior_year_profit_after_tax_inr_cr', 'net_worth_inr_cr', 'legal_entity_cin', 'teardown_url',
  ]
  const lines = rows.map(({ a, f }) =>
    [a.company, f!.period, f!.basis, f!.revenueCr, f!.patCr, f!.prevPatCr, f!.netWorthCr, f!.entityCin, `${SITE_URL}/${a.slug}`]
      .map(cell)
      .join(','),
  )
  // Plain CSV (no comment lines) so spreadsheets and pandas read it as is;
  // the source and reuse terms live on /profitability-index.
  const csv = [
    header.join(','),
    ...lines,
  ].join('\n')
  return new Response(csv + '\n', {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'inline; filename="unpopularvoice-profitability-index.csv"',
    },
  })
}
