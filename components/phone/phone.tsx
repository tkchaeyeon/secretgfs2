'use client'

import { useState, type ReactNode } from 'react'
import Image from 'next/image'
import type { AppId } from './app-icons'
import { HomeScreen } from './home-screen'
import { NameDialog } from './name-dialog'
import { IncomingCall } from './incoming-call'
import { NameProvider } from './name-context'
import { KakaoBanner, KakaoNotifications } from './kakao-notifications'
import { KakaoScriptProvider, useKakaoScript } from './kakao-script'
import { StatusBar } from './status-bar'
import { GoogleApp } from './apps/google-app'
import { CalendarApp } from './apps/calendar-app'
import { PhoneApp } from './apps/phone-app'
import { MessagesApp } from './apps/messages-app'
import { XApp } from './apps/x-app'
import { InstagramApp } from './apps/instagram-app'
import { KakaoApp } from './apps/kakao-app'
import { PhotosApp } from './apps/photos-app'

const APPLE_MUSIC_URL = 'https://music.apple.com/kr/album/i-spy-the-4th-mini-album-ep/6816842802'
const CALL_DELAY_MS = 1000

const YOUTUBE_URL = 'https://youtu.be/CJ8DspyQiOo?si=cWXZb_9ZOBmMFUAI'

type ScreenApp = Exclude<AppId, 'music' | 'youtube'>

const APP_THEME: Record<ScreenApp, { bg: string; tone: 'light' | 'dark' }> = {
  phone: { bg: 'bg-white', tone: 'dark' },
  messages: { bg: 'bg-white', tone: 'dark' },
  photos: { bg: 'bg-white', tone: 'dark' },
  calendar: { bg: 'bg-white', tone: 'dark' },
  google: { bg: 'bg-white', tone: 'dark' },
  instagram: { bg: 'bg-white', tone: 'dark' },
  kakao: { bg: 'bg-white', tone: 'dark' },
  x: { bg: 'bg-white', tone: 'dark' },
}

type CallOutcome = 'answered' | 'missed' | null

function renderApp(id: ScreenApp, callOutcome: CallOutcome): ReactNode {
  switch (id) {
    case 'google':
      return <GoogleApp />
    case 'calendar':
      return <CalendarApp />
    case 'phone':
      return <PhoneApp callOutcome={callOutcome} />
    case 'messages':
      return <MessagesApp />
    case 'x':
      return <XApp />
    case 'instagram':
      return <InstagramApp />
    case 'kakao':
      return <KakaoApp />
    case 'photos':
      return <PhotosApp />
  }
}

export function Phone() {
  return (
    <NameProvider>
      <KakaoScriptProvider>
        <PhoneScreen />
      </KakaoScriptProvider>
    </NameProvider>
  )
}

function PhoneScreen() {
  const [openApp, setOpenApp] = useState<ScreenApp | null>(null)
  const [askingName, setAskingName] = useState(true)
  const [calling, setCalling] = useState(false)
  const [callOutcome, setCallOutcome] = useState<CallOutcome>(null)
  const callEnded = callOutcome !== null
  const [kakaoArrived, setKakaoArrived] = useState(0)
  const script = useKakaoScript()

  const handleOpen = (id: AppId) => {
    if (id === 'music' || id === 'youtube') {
      const url = id === 'music' ? APPLE_MUSIC_URL : YOUTUBE_URL
      if (window.self !== window.top) window.open(url, '_blank', 'noopener,noreferrer')
      else window.location.href = url
      return
    }
    setOpenApp(id)
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-neutral-900 sm:py-8">
      <div className="relative h-dvh w-full overflow-hidden bg-black sm:h-[844px] sm:w-[390px] sm:rounded-[56px] sm:shadow-[0_0_0_11px_#1c1c1e,0_0_0_13px_#3a3a3c,0_30px_60px_rgba(0,0,0,0.6)]">
        <Image
          src="/images/wallpaper.jpeg"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 390px, 100vw"
          className="object-cover object-[68%_center]"
        />

        <div className="absolute inset-0" inert={Boolean(openApp) || askingName || calling}>
          <HomeScreen onOpenApp={handleOpen} badges={{ phone: callOutcome === 'missed' ? 6 : 5, kakao: 1 + kakaoArrived + (script.finalUnread ? 1 : 0) }} />
        </div>

        {openApp && (
          <div
            inert={calling}
            className={`absolute inset-0 z-20 flex flex-col ${APP_THEME[openApp].bg} animate-in fade-in zoom-in-90 duration-200`}
          >
            <StatusBar tone={APP_THEME[openApp].tone} />
            <div className="relative min-h-0 flex-1">{renderApp(openApp, callOutcome)}</div>
            <div className={`flex h-[76px] shrink-0 items-center justify-center ${APP_THEME[openApp].bg}`}>
              <button
                type="button"
                onClick={() => setOpenApp(null)}
                aria-label="홈 화면으로"
                className="flex size-[52px] items-center justify-center rounded-full border-[2.5px] border-neutral-400/70 bg-neutral-200/10 transition-transform active:scale-90"
              >
                <span className="size-[18px] rounded-[5px] border-2 border-neutral-400/80" />
              </button>
            </div>
          </div>
        )}

        {askingName && (
          <NameDialog
            onDone={() => {
              setAskingName(false)
              setTimeout(() => setCalling(true), CALL_DELAY_MS)
            }}
          />
        )}

        {calling && (
          <IncomingCall
            onEnd={(answered) => {
              setCalling(false)
              setCallOutcome(answered ? 'answered' : 'missed')
            }}
          />
        )}

        {callEnded && <KakaoNotifications onArrive={setKakaoArrived} onOpen={() => setOpenApp('kakao')} />}

        {script.banner && (
          <KakaoBanner
            text={script.banner}
            onOpen={() => {
              script.dismissBanner()
              setOpenApp('kakao')
            }}
          />
        )}
      </div>
    </div>
  )
}
