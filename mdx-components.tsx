import type { MDXComponents } from 'mdx/types'
import FinancialTable from '@/components/mdx/FinancialTable'
import RealityScore from '@/components/mdx/RealityScore'
import InsightBox from '@/components/mdx/InsightBox'
import ChartBlock from '@/components/mdx/ChartBlock'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    FinancialTable,
    RealityScore,
    InsightBox,
    ChartBlock,
    ...components,
  }
}
