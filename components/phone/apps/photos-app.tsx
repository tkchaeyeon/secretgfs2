'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, Play } from 'lucide-react'

type GalleryItem =
  | { kind: 'photo'; src: string; alt: string }
  | { kind: 'video'; src: string; alt: string }

const ITEMS: GalleryItem[] = [
  { kind: 'photo', src: '/images/gallery-1.jpeg', alt: '사진 1' },
  { kind: 'photo', src: '/images/gallery-2.jpeg', alt: '사진 2' },
  { kind: 'photo', src: '/images/gallery-3.jpeg', alt: '사진 3' },
  { kind: 'photo', src: '/images/gallery-4.jpeg', alt: '사진 4' },
  { kind: 'photo', src: '/images/gallery-5.jpeg', alt: '사진 5' },
  { kind: 'photo', src: '/images/gallery-6.jpeg', alt: '사진 6' },
  { kind: 'photo', src: '/images/gallery-7.jpeg', alt: '사진 7' },
  { kind: 'video', src: '/media/gallery-video-2.mov', alt: '동영상 2' },
  { kind: 'photo', src: '/images/gallery-8.jpeg', alt: '사진 8' },
  { kind: 'photo', src: '/images/gallery-9.jpeg', alt: '사진 9' },
  { kind: 'photo', src: '/images/gallery-10.jpeg', alt: '사진 10' },
  { kind: 'photo', src: '/images/gallery-11.jpeg', alt: '사진 11' },
  { kind: 'photo', src: '/images/gallery-12.jpeg', alt: '사진 12' },
  { kind: 'photo', src: '/images/gallery-13.jpeg', alt: '사진 13' },
  { kind: 'video', src: '/media/gallery-video-1.mov', alt: '동영상 1' },
]

function MediaViewer({ item, onBack }: { item: GalleryItem; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-black">
      <header className="flex items-center px-2 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 items-center gap-0.5 pr-3 text-[17px] text-[#0a84ff]"
          aria-label="보관함으로 돌아가기"
        >
          <ChevronLeft className="size-7" strokeWidth={2.2} />
          보관함
        </button>
      </header>
      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        {item.kind === 'photo' ? (
          <Image src={item.src} alt={item.alt} fill sizes="393px" className="object-contain" priority />
        ) : (
          <video
            src={item.src}
            controls
            autoPlay
            playsInline
            className="max-h-full w-full object-contain"
            aria-label={item.alt}
          />
        )}
      </div>
    </div>
  )
}

export function PhotosApp() {
  const [openItem, setOpenItem] = useState<GalleryItem | null>(null)

  if (openItem) return <MediaViewer item={openItem} onBack={() => setOpenItem(null)} />

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="flex items-end justify-between px-4 pb-3">
        <div>
          <h1 className="text-[30px] font-bold text-black">보관함</h1>
          <p className="text-[14px] text-black/50">항목 {ITEMS.length}개</p>
        </div>
        <span className="rounded-full bg-black/5 px-3 py-1 text-[14px] font-medium text-[#007aff]">선택</span>
      </div>
      <div className="grid grid-cols-3 gap-0.5">
        {ITEMS.map((item) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setOpenItem(item)}
            className="relative aspect-square overflow-hidden bg-black/5"
            aria-label={`${item.alt} 보기`}
          >
            {item.kind === 'photo' ? (
              <Image src={item.src} alt="" fill sizes="130px" className="object-cover" />
            ) : (
              <>
                <video
                  src={`${item.src}#t=0.1`}
                  muted
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 size-full object-cover"
                  aria-hidden="true"
                />
                <span className="absolute bottom-1 right-1.5 flex items-center text-white drop-shadow">
                  <Play className="size-3.5 fill-white" />
                </span>
              </>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
