import { handleSchedule } from '@vercel/schedules'
import { getAllArticles, parseUpdatedAt } from '@/lib/articles'
import { getAllComparisons } from '@/lib/comparisons'
import { broadcastNames, emailConfigured, sendBroadcast, teardownEmail } from '@/lib/email'
import baseline from '@/content/newsletter-baseline.json'

// Daily: email the list about each newly published teardown or comparison,
// once. Private: only Vercel's scheduler can invoke this function (vercel.json).
//
// - Pieces published before automatic emails began are in the baseline and
//   never trigger a send.
// - The sent-log is the broadcast name ("teardown:<slug>") in Resend, so a
//   repeated or overlapping run cannot email the same piece twice.
// - At most one email per run, so a busy publishing day spreads out.
// - A piece older than 30 days is skipped (guards against a stale baseline).

const MAX_AGE_DAYS = 30
const sentName = (slug: string) => `teardown:${slug}`

export const POST = handleSchedule(async (metadata) => {
  if (!emailConfigured()) {
    console.error(`[newsletter] ${metadata.executionId}: email not configured, nothing sent`)
    return
  }
  const known = new Set<string>(baseline.slugs)
  const now = Date.now()
  const fresh = (d: string) => now - parseUpdatedAt(d).getTime() < MAX_AGE_DAYS * 86400000

  const candidates = [
    ...getAllArticles()
      .filter((a) => a.published !== false && !known.has(a.slug) && fresh(a.publishedAt ?? a.updatedAt))
      .map((a) => ({ slug: a.slug, path: `/${a.slug}`, title: a.title, company: a.company, tldr: a.tldr || [], date: a.publishedAt ?? a.updatedAt })),
    ...getAllComparisons()
      .filter((c) => !known.has(`compare/${c.slug}`) && fresh(c.updatedAt))
      .map((c) => ({ slug: `compare/${c.slug}`, path: `/compare/${c.slug}`, title: c.title, company: 'Comparison', tldr: (c as { tldr?: string[] }).tldr || [], date: c.updatedAt })),
  ].sort((x, y) => parseUpdatedAt(x.date).getTime() - parseUpdatedAt(y.date).getTime())

  if (candidates.length === 0) {
    console.log(`[newsletter] ${metadata.executionId}: no new pieces`)
    return
  }
  const sent = await broadcastNames()
  const next = candidates.find((c) => !sent.has(sentName(c.slug)))
  if (!next) {
    console.log(`[newsletter] ${metadata.executionId}: ${candidates.length} new piece(s), all already emailed`)
    return
  }
  const id = await sendBroadcast(sentName(next.slug), teardownEmail(next))
  console.log(`[newsletter] ${metadata.executionId}: emailed ${next.slug} (broadcast ${id})`)
})
