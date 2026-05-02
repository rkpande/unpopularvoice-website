import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: '#B22222',
          }}
        />
        <span
          style={{
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-2px',
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
