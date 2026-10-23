'use client'

import { useEffect, useState } from 'react'
import { AppIcon } from './app-icons'
import { useNames } from './name-context'
import { vocative } from '@/lib/korean-particles'

export const KAKAO_SENDER = 'y ❤︎'
const INTERVAL_MS = 2000
const START_DELAY_MS = 1000

export function kakaoNotificationTexts(name: string) {
  return [vocative(name), '전화 안 끊으면 안 돼?', '걱정돼', '보러 가도 돼?', '보고 싶어']
}

export function KakaoNotifications({
  onArrive,
  onOpen,
}: {
  onArrive: (count: number) => void
  onOpen: () => void
}) {
  const { koreanName } = useNames()
  const texts = kakaoNotificationTexts(koreanName)
  const [current, setCurrent] = useState<number | null>(null)

  useEffect(() => {
    const timers = texts.map((_, i) =>
      setTimeout(() => {
        setCurrent(i)
        onArrive(i + 1)
      }, START_DELAY_MS + i * INTERVAL_MS),
    )
    timers.push(setTimeout(() => setCurrent(null), START_DELAY_MS + texts.length * INTERVAL_MS + 1500))
    return () => timers.forEach(clearTimeout)
    // Runs once per mount; the sequence must not restart on re-render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (current === null) return null

  return (
    <KakaoBanner
      key={current}
      text={texts[current]}
      onOpen={() => {
        setCurrent(null)
        onOpen()
      }}
    />
  )
}

export function KakaoBanner({ text, onOpen }: { text: string; onOpen: () => void }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] px-2 pt-[52px]" aria-live="polite">
      <button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto flex w-full items-center gap-3 rounded-[22px] bg-white/85 px-3.5 py-3 text-left shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-6 duration-300"
      >
        <span className="w-[38px] shrink-0">
          <AppIcon id="kakao" className="w-full" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center justify-between gap-2">
            <span className="truncate text-[15px] font-semibold text-black">{KAKAO_SENDER}</span>
            <span className="shrink-0 text-[13px] text-black/45">지금</span>
          </span>
          <span className="block truncate text-[15px] text-black">{text}</span>
        </span>
      </button>
    </div>
  )
}
