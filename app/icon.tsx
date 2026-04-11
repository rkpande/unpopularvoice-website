import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Red top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: '#B22222',
          }}
        />
        <span
          style={{
            color: '#ffffff',
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '-0.5px',
            fontFamily: 'serif',
          }}
        >
          UV
        </span>
      </div>
    ),
    { ...size }
  )
}
