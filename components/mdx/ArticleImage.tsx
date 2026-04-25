import Image from 'next/image'

interface ArticleImageProps {
  src: string
  alt: string
  caption?: string
  credit?: string
  creditUrl?: string
  width?: number
  height?: number
}

export default function ArticleImage({
  src,
  alt,
  caption,
  credit,
  creditUrl,
  width = 1200,
  height = 675,
}: ArticleImageProps) {
  return (
    <figure className="not-prose my-10">
      <div className="relative overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 720px"
          priority={false}
        />
      </div>
      {(caption || credit) && (
        <figcaption className="mt-3 flex items-start justify-between gap-4">
          {caption && (
            <span className="font-sans text-[12px] text-gray-400 leading-snug">
              {caption}
            </span>
          )}
          {credit && (
            <span className="font-sans text-[11px] text-gray-300 whitespace-nowrap shrink-0">
              {creditUrl ? (
                <a
                  href={creditUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-500 transition-colors"
                >
                  Photo: {credit}
                </a>
              ) : (
                <>Photo: {credit}</>
              )}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  )
}
