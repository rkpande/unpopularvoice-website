import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

function chipColors(value: string): { bg: string; color: string; border: string } {
  const green  = ['Strong', 'Achieved', 'Low', 'High']
  const amber  = ['Moderate', 'Improving', 'Near Break-even', 'High Variance']
  const orange = ['Stretched', 'Weak', 'Limited']
  const red    = ['Critical', 'Loss-Deepening', 'Declining']
  if (green.includes(value))  return { bg: '#dcfce7', color: '#15803d', border: '#86efac' }
  if (amber.includes(value))  return { bg: '#fffbeb', color: '#b45309', border: '#fde68a' }
  if (orange.includes(value)) return { bg: '#fff7ed', color: '#c2410c', border: '#fdba74' }
  if (red.includes(value))    return { bg: '#fef2f2', color: '#dc2626', border: '#fca5a5' }
  return                             { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' }
}

const verdictPalette = {
  solid:   { bg: '#f0fdf4', border: '#86efac', color: '#15803d', dot: '#22c55e', label: 'SOLID'   },
  watch:   { bg: '#fffbeb', border: '#fde68a', color: '#b45309', dot: '#f59e0b', label: 'WATCH'   },
  caution: { bg: '#fef2f2', border: '#fca5a5', color: '#dc2626', dot: '#ef4444', label: 'CAUTION' },
}

function DimRow({ label, value }: { label: string; value: string }) {
  const chip = chipColors(value)
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #1f2937' }}>
      <span style={{ fontFamily: 'sans-serif', color: '#9ca3af', fontSize: 13 }}>{label}</span>
      <span style={{
        fontFamily: 'sans-serif',
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        background: chip.bg,
        color: chip.color,
        border: `1px solid ${chip.border}`,
        borderRadius: 999,
        padding: '2px 10px',
      }}>
        {value}
      </span>
    </div>
  )
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'employer') {
    const company  = searchParams.get('company')  || 'Company'
    const verdict  = (searchParams.get('verdict') || 'watch') as 'solid' | 'watch' | 'caution'
    const gm       = searchParams.get('gm')  || '—'
    const st       = searchParams.get('st')  || '—'
    const pr       = searchParams.get('pr')  || '—'
    const fd       = searchParams.get('fd')  || '—'
    const cu       = searchParams.get('cu')  || '—'
    const period   = searchParams.get('period') || ''
    const vp       = verdictPalette[verdict]

    return new ImageResponse(
      (
        <div style={{ display: 'flex', flexDirection: 'column', background: '#000', width: '100%', height: '100%', padding: '56px 72px', fontFamily: 'serif', justifyContent: 'space-between' }}>
          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: '#ef4444', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.2em', fontFamily: 'sans-serif', fontWeight: 700 }}>
              EMPLOYER CHECK · UNPOPULARVOICE
            </span>
            {period && (
              <span style={{ color: '#4b5563', fontSize: 12, fontFamily: 'sans-serif' }}>{period}</span>
            )}
          </div>

          {/* Company + verdict */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: 8 }}>
            <span style={{ color: '#fff', fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>{company}</span>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: vp.bg, border: `1.5px solid ${vp.border}`,
              borderRadius: 999, padding: '8px 20px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: vp.dot }} />
              <span style={{ fontFamily: 'sans-serif', fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: vp.color }}>
                {vp.label}
              </span>
            </div>
          </div>

          {/* Dimensions */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 0 }}>
            <DimRow label="Growth Momentum"    value={gm} />
            <DimRow label="Stability"          value={st} />
            <DimRow label="Profitability"      value={pr} />
            <DimRow label="Funding Dependence" value={fd} />
            <DimRow label="Career Upside"      value={cu} />
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #1f2937', paddingTop: 20 }}>
            <span style={{ color: '#374151', fontSize: 12, fontFamily: 'sans-serif' }}>From audited MCA filing only</span>
            <span style={{ color: '#374151', fontSize: 12, fontFamily: 'sans-serif', letterSpacing: '0.04em' }}>unpopularvoice.com/employer-check</span>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }

  // Default: article OG
  const title   = searchParams.get('title')   || 'Financial teardowns of Indian startups.'
  const company = searchParams.get('company') || ''
  const sector  = searchParams.get('sector')  || ''

  return new ImageResponse(
    (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#000000', width: '100%', height: '100%', padding: '72px', fontFamily: 'serif' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#ef4444', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.25em', fontFamily: 'sans-serif', fontWeight: 700 }}>
            UnpopularVoice
          </span>
          {company && (
            <>
              <span style={{ color: '#374151', fontSize: 13, fontFamily: 'sans-serif' }}>/</span>
              <span style={{ color: '#6b7280', fontSize: 13, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {company}
              </span>
            </>
          )}
        </div>

        <div style={{ color: '#ffffff', fontSize: title.length > 60 ? 48 : 56, fontWeight: 700, lineHeight: 1.1, flex: 1, display: 'flex', alignItems: 'center', paddingTop: '40px', paddingBottom: '40px' }}>
          {title}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '24px' }}>
          <span style={{ color: '#4b5563', fontSize: 14, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {sector || 'Financial deep dive'}
          </span>
          <span style={{ color: '#374151', fontSize: 14, fontFamily: 'sans-serif', letterSpacing: '0.05em' }}>
            unpopularvoice.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
