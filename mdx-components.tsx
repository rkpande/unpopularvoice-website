import type { MDXComponents } from 'mdx/types'
import FinancialTable from '@/components/mdx/FinancialTable'
import RealityScore from '@/components/mdx/RealityScore'
import InsightBox from '@/components/mdx/InsightBox'
import ChartBlock from '@/components/mdx/ChartBlock'
import KeyMetrics from '@/components/mdx/KeyMetrics'
import Assumptions from '@/components/mdx/Assumptions'
import CenterpieceTable from '@/components/mdx/CenterpieceTable'
import SignatureLine from '@/components/mdx/SignatureLine'
import ArticleImage from '@/components/mdx/ArticleImage'
import PullQuote from '@/components/mdx/PullQuote'
import RelatedArticles from '@/components/mdx/RelatedArticles'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    FinancialTable,
    RealityScore,
    InsightBox,
    ChartBlock,
    KeyMetrics,
    Assumptions,
    CenterpieceTable,
    SignatureLine,
    ArticleImage,
    PullQuote,
    RelatedArticles,
    ...components,
  }
}
