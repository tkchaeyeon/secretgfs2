'use client'

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { vocative } from '@/lib/korean-particles'
import { useNames } from './name-context'

export type ScriptMessage = { from: 'me' | 'them'; time: string; text: string }

const MY_LINES = ['우시야', '우리 그냥 헤어질까', '으응...', '빨리 와']
const MY_TIMES = ['오전 2:13', '오전 2:13', '오전 2:14', '오전 2:14']
const FIRST_REPLY_MS = 1000
const SECOND_REPLY_MS = 2500
const FINAL_REPLY_MS = 30000
const BANNER_MS = 4000

type KakaoScript = {
  messages: ScriptMessage[]
  guide: string | null
  canSend: boolean
  typing: boolean
  send: (text: string) => void
  banner: string | null
  dismissBanner: () => void
  finalUnread: boolean
  markFinalRead: () => void
}

const KakaoScriptContext = createContext<KakaoScript | null>(null)

export function KakaoScriptProvider({ children }: { children: ReactNode }) {
  const { koreanName } = useNames()
  const [messages, setMessages] = useState<ScriptMessage[]>([])
  const [step, setStep] = useState(0)
  const [waiting, setWaiting] = useState(false)
  const [typing, setTyping] = useState(false)
  const [banner, setBanner] = useState<string | null>(null)
  const [finalUnread, setFinalUnread] = useState(false)
  const bannerTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const markFinalRead = useCallback(() => setFinalUnread(false), [])

  const append = (m: ScriptMessage) => setMessages((list) => [...list, m])

  const showBanner = (text: string) => {
    setBanner(text)
    if (bannerTimer.current) clearTimeout(bannerTimer.current)
    bannerTimer.current = setTimeout(() => setBanner(null), BANNER_MS)
  }

  const send = (text: string) => {
    if (waiting || step >= MY_LINES.length) return
    const current = step
    append({ from: 'me', time: MY_TIMES[current], text: text.trim() || MY_LINES[current] })
    setStep(current + 1)

    if (current === 1) {
      setWaiting(true)
      setTyping(true)
      setTimeout(() => append({ from: 'them', time: '오전 2:13', text: vocative(koreanName) }), FIRST_REPLY_MS)
      setTimeout(() => {
        append({ from: 'them', time: '오전 2:14', text: '얼굴 보고 얘기해주면 안 돼?' })
        setTyping(false)
        setWaiting(false)
      }, SECOND_REPLY_MS)
    }

    if (current === MY_LINES.length - 1) {
      setTimeout(() => {
        const finalText = `${vocative(koreanName)} 나 집 앞이야`
        append({ from: 'them', time: '오전 2:14', text: finalText })
        setFinalUnread(true)
        showBanner(finalText)
      }, FINAL_REPLY_MS)
    }
  }

  const value: KakaoScript = {
    messages,
    guide: step < MY_LINES.length ? MY_LINES[step] : null,
    canSend: !waiting && step < MY_LINES.length,
    typing,
    send,
    banner,
    dismissBanner: () => setBanner(null),
    finalUnread,
    markFinalRead,
  }

  return <KakaoScriptContext.Provider value={value}>{children}</KakaoScriptContext.Provider>
}

export function useKakaoScript() {
  const ctx = useContext(KakaoScriptContext)
  if (!ctx) throw new Error('useKakaoScript must be used within KakaoScriptProvider')
  return ctx
}
