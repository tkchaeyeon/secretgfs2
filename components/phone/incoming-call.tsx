'use client'

import { useEffect, useRef, useState } from 'react'
import { Grid3x3, Mic, MicOff, Phone, PhoneOff, UserPlus, Video, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const CALLER = '유 우 시💕'
const CALL_AUDIO_SRC = '/media/call-audio-5.mov'

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function IncomingCall({ onEnd }: { onEnd: (answered: boolean) => void }) {
  const [accepted, setAccepted] = useState(false)
  const [muted, setMuted] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const audioRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!accepted) return
    const id = setInterval(() => setElapsed((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [accepted])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted
  }, [muted])

  const accept = () => {
    setAccepted(true)
    audioRef.current?.play().catch(() => {})
  }

  const hangUp = () => {
    audioRef.current?.pause()
    onEnd(accepted)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${CALLER} 전화`}
      className="absolute inset-0 z-50 flex flex-col items-center bg-[linear-gradient(180deg,#3a3a40_0%,#1c1c20_55%,#0d0d10_100%)] px-8 pt-24 pb-16 text-white animate-in fade-in slide-in-from-top-4 duration-300"
    >
      {/* Video is used only as an audio source; nothing is rendered visually. */}
      <video ref={audioRef} src={CALL_AUDIO_SRC} playsInline preload="auto" className="hidden" aria-hidden="true" />

      <p className="text-[16px] text-white/60">{accepted ? formatDuration(elapsed) : '휴대전화...'}</p>
      <h2 className="mt-2 text-center text-[34px] font-normal leading-tight">{CALLER}</h2>

      <div className="flex-1" />

      {accepted ? (
        <div className="flex w-full flex-col items-center gap-10">
          <div className="grid w-full grid-cols-3 gap-x-6 gap-y-7">
            <CallControl label={muted ? '소리 켬' : '소리 끔'} active={muted} onClick={() => setMuted((m) => !m)}>
              {muted ? <MicOff className="size-7" /> : <Mic className="size-7" />}
            </CallControl>
            <CallControl label="키패드">
              <Grid3x3 className="size-7" />
            </CallControl>
            <CallControl label="스피커">
              <Volume2 className="size-7" />
            </CallControl>
            <CallControl label="통화 추가">
              <UserPlus className="size-7" />
            </CallControl>
            <CallControl label="FaceTime">
              <Video className="size-7" />
            </CallControl>
            <CallControl label="연락처">
              <span className="text-[22px] font-semibold">{'유'}</span>
            </CallControl>
          </div>
          <button
            type="button"
            onClick={hangUp}
            aria-label="통화 종료"
            className="flex size-[76px] items-center justify-center rounded-full bg-[#ff3b30] transition-transform active:scale-90"
          >
            <PhoneOff className="size-8 fill-white" />
          </button>
        </div>
      ) : (
        <div className="flex w-full items-end justify-between px-2">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={hangUp}
              aria-label="거절"
              className="flex size-[76px] items-center justify-center rounded-full bg-[#ff3b30] transition-transform active:scale-90"
            >
              <PhoneOff className="size-8 fill-white" />
            </button>
            <span className="text-[14px]">거절</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={accept}
              aria-label="수락"
              className="flex size-[76px] items-center justify-center rounded-full bg-[#34c759] transition-transform active:scale-90"
            >
              <Phone className="size-8 fill-white" />
            </button>
            <span className="text-[14px]">수락</span>
          </div>
        </div>
      )}
    </div>
  )
}

function CallControl({
  label,
  active,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        aria-pressed={onClick ? Boolean(active) : undefined}
        className={cn(
          'flex size-[72px] items-center justify-center rounded-full transition-colors',
          active ? 'bg-white text-black' : 'bg-white/15 text-white',
        )}
      >
        {children}
      </button>
      <span className="text-[13px] text-white/90">{label}</span>
    </div>
  )
}
