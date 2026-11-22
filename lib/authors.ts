// Author registry for UnpopularVoice.
//
// Structure is single-author-first but extensible — future contributors are
// added as new entries and articles reference them by slug via
// `author` frontmatter (or default to the primary author).

export interface Author {
  slug: string
  name: string
  role: string
  bio: string
  // Public profile URLs — used for Person.sameAs in JSON-LD. Add only URLs
  // that are publicly accessible (not per-user URLs like linkedin.com/feed).
  sameAs?: string[]
}

const AUTHORS: Record<string, Author> = {
  'parthsarthy-p': {
    slug: 'parthsarthy-p',
    name: 'ParthSarthy P',
    role: 'Founder & Editor, UnpopularVoice',
    bio: 'ParthSarthy P reads what the audit says, not what the press release claims. He writes forensic teardowns of Indian startups on UnpopularVoice, starting with the balance sheet and ending where the numbers stop.',
    sameAs: [
      'https://www.linkedin.com/in/unpopular-voice/',
      'https://x.com/UnpopularV83586',
      'https://www.youtube.com/@YourUnpopularVoice',
    ],
  },
  'anjali-m': {
    slug: 'anjali-m',
    name: 'Anjali M.',
    role: 'Contributor, UnpopularVoice',
    bio: 'Anjali M. covers Indian consumer, retail, and quick commerce for UnpopularVoice. She reads the annual returns first and asks the second question later.',
    sameAs: [],
  },
}

export const PRIMARY_AUTHOR_SLUG = 'parthsarthy-p'

export function getAuthor(slug: string): Author | null {
  return AUTHORS[slug] || null
}

export function getPrimaryAuthor(): Author {
  return AUTHORS[PRIMARY_AUTHOR_SLUG]
}

export function getAllAuthors(): Author[] {
  return Object.values(AUTHORS)
}

// Person JSON-LD for the given author, ready to embed as-is.
export function authorJsonLd(author: Author, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/author/${author.slug}#person`,
    name: author.name,
    url: `${siteUrl}/author/${author.slug}`,
    jobTitle: author.role,
    description: author.bio,
    worksFor: { '@id': `${siteUrl}/#organization` },
    ...(author.sameAs && author.sameAs.length ? { sameAs: author.sameAs } : {}),
  }
}
