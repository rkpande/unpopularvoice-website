'use client'

import { useState } from 'react'

interface VideoEmbedProps {
  id: string // YouTube video id
  title: string
  description: string
  uploadDate: string // ISO 8601, as YouTube reports it
  duration: string // ISO 8601, e.g. PT4M23S
}

// A YouTube video inside an article. Light until asked: the page shows the
// thumbnail and a play button, and the YouTube player (about 1 MB of scripts)
// loads only on click, from the privacy-enhanced domain. VideoObject data lets
// search engines show the page with a video result.
export default function VideoEmbed({ id, title, description, uploadDate, duration }: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false)
  const thumb = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  const watchUrl = `https://www.youtube.com/watch?v=${id}`
  const minutes = (() => {
    const m = /PT(?:(\d+)M)?(?:(\d+)S)?/.exec(duration)
    if (!m) return ''
    return `${m[1] ?? 0}:${String(m[2] ?? 0).padStart(2, '0')}`
  })()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: [thumb],
    uploadDate,
    duration,
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    contentUrl: watchUrl,
    publisher: { '@type': 'Organization', name: 'UnpopularVoice', url: 'https://unpopularvoice.com' },
  }

  return (
    <figure className="not-prose my-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Play video: ${title}${minutes ? ` (${minutes})` : ''}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 transition-transform group-hover:scale-105"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-sans text-sm">
        <span className="font-semibold text-black">{title}</span>
        <span className="text-gray-500">
          {minutes && <span className="tabular-nums">{minutes} · </span>}
          <a href={watchUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black">
            Watch on YouTube
          </a>
        </span>
      </figcaption>
    </figure>
  )
}
