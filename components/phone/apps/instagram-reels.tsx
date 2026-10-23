'use client'

import { useEffect, useRef, useState } from 'react'
import { Heart, MessageCircle, Music2, Send, Ellipsis, Volume2, VolumeX } from 'lucide-react'

const REELS = [
  { id: 'reel-1', src: '/media/reel-1.mp4', likes: '18.2만', comments: '3,104', shares: '9,872' },
  { id: 'reel-2', src: '/media/reel-2.mp4', likes: '12.7만', comments: '2,215', shares: '6,430' },
]

const ACCOUNT = 'nctwish_official'

export function InstagramReels() {
  const [muted, setMuted] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)

  const handleAutoplayBlocked = () => {
    setAutoplayBlocked(true)
    setMuted(true)
  }

  // Browsers that refuse unmuted autoplay get sound back on the first touch anywhere in reels.
  const restoreSound = () => {
    if (!autoplayBlocked) return
    setAutoplayBlocked(false)
    setMuted(false)
  }

  return (
    <div className="h-full snap-y snap-mandatory overflow-y-auto bg-black" onPointerDown={restoreSound}>
      {REELS.map((reel) => (
        <ReelItem
          key={reel.id}
          reel={reel}
          muted={muted}
          onToggleMute={() => {
            setAutoplayBlocked(false)
            setMuted((m) => !m)
          }}
          onAutoplayBlocked={handleAutoplayBlocked}
        />
      ))}
    </div>
  )
}

function ReelItem({
  reel,
  muted,
  onToggleMute,
  onAutoplayBlocked,
}: {
  reel: (typeof REELS)[number]
  muted: boolean
  onToggleMute: () => void
  onAutoplayBlocked: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [liked, setLiked] = useState(false)
  const onBlockedRef = useRef(onAutoplayBlocked)
  onBlockedRef.current = onAutoplayBlocked

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {
            video.muted = true
            onBlockedRef.current()
            video.play().catch(() => {})
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.6 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative h-full w-full snap-start snap-always overflow-hidden bg-black" aria-label={`${ACCOUNT} 릴스`}>
      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 size-full object-cover"
        muted={muted}
        loop
        playsInline
        preload="auto"
        onClick={onToggleMute}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-3 text-white">
        <span className="text-[22px] font-bold drop-shadow">릴스</span>
      </div>

      <button
        type="button"
        onClick={onToggleMute}
        aria-label={muted ? '소리 켜기' : '소리 끄기'}
        className="absolute right-3 top-12 flex size-11 items-center justify-center"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-black/50 text-white">
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </span>
      </button>

      <div className="absolute bottom-4 right-2 flex flex-col items-center gap-4 text-white">
        <button
          type="button"
          onClick={() => setLiked((l) => !l)}
          aria-label="좋아요"
          aria-pressed={liked}
          className="flex min-h-11 min-w-11 flex-col items-center gap-1"
        >
          <Heart className={liked ? 'size-7 fill-[#ff3040] text-[#ff3040]' : 'size-7'} strokeWidth={1.8} />
          <span className="text-[12px] font-semibold drop-shadow">{reel.likes}</span>
        </button>
        <span className="flex flex-col items-center gap-1">
          <MessageCircle className="size-7 -scale-x-100" strokeWidth={1.8} />
          <span className="text-[12px] font-semibold drop-shadow">{reel.comments}</span>
        </span>
        <span className="flex flex-col items-center gap-1">
          <Send className="size-7" strokeWidth={1.8} />
          <span className="text-[12px] font-semibold drop-shadow">{reel.shares}</span>
        </span>
        <Ellipsis className="size-6" />
        <span className="size-7 overflow-hidden rounded-md border-2 border-white bg-[#9eff3d]" aria-hidden="true" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-4 pt-16 pr-16 text-white">
        <div className="flex items-center gap-2">
<img
src="/images/nctwish-avatar.jpeg"
alt=""
className="size-8 shrink-0 rounded-full object-cover"
/>
          <span className="text-[14px] font-semibold drop-shadow">{ACCOUNT}</span>
          <span className="rounded-lg border border-white/80 px-2.5 py-0.5 text-[13px] font-semibold">팔로우</span>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[13px]">
          <Music2 className="size-3.5" />
          <span className="truncate">NCT WISH · 오리지널 오디오</span>
        </div>
      </div>
    </section>
  )
}
