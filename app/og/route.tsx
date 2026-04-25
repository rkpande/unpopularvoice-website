import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Financial teardowns of Indian startups.'
  const company = searchParams.get('company') || ''
  const sector = searchParams.get('sector') || ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#000000',
          width: '100%',
          height: '100%',
          padding: '72px',
          fontFamily: 'serif',
        }}
      >
        {/* Top: brand + company */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              color: '#ef4444',
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              fontFamily: 'sans-serif',
              fontWeight: 700,
            }}
          >
            UnpopularVoice
          </span>
          {company && (
            <>
              <span style={{ color: '#374151', fontSize: 13, fontFamily: 'sans-serif' }}>/</span>
              <span
                style={{
                  color: '#6b7280',
                  fontSize: 13,
                  fontFamily: 'sans-serif',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {company}
              </span>
            </>
          )}
        </div>

        {/* Middle: title */}
        <div
          style={{
            color: '#ffffff',
            fontSize: title.length > 60 ? 48 : 56,
            fontWeight: 700,
            lineHeight: 1.1,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            paddingTop: '40px',
            paddingBottom: '40px',
          }}
        >
          {title}
        </div>

        {/* Bottom: sector + domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid #1f2937',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              color: '#4b5563',
              fontSize: 14,
              fontFamily: 'sans-serif',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            {sector || 'Financial deep dive'}
          </span>
          <span
            style={{
              color: '#374151',
              fontSize: 14,
              fontFamily: 'sans-serif',
              letterSpacing: '0.05em',
            }}
          >
            unpopularvoice.com
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
