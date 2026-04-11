import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import Hero from '@/components/home/Hero'
import FeaturedArticle from '@/components/home/FeaturedArticle'
import LatestArticles from '@/components/home/LatestArticles'
import RealityCheckIndex from '@/components/home/RealityCheckIndex'
import NewsletterCTA from '@/components/home/NewsletterCTA'

export default function HomePage() {
  const all = getAllArticles()
  const featured = getFeaturedArticle()
  const latest = all.filter((a) => !a.featured).slice(0, 6)

  return (
    <>
      <Hero topArticles={all.slice(0, 3)} />
      {featured && <FeaturedArticle article={featured} />}
      {latest.length > 0 && <LatestArticles articles={latest} />}
      <RealityCheckIndex articles={all} />
      <NewsletterCTA />
    </>
  )
}
