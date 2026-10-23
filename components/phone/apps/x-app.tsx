'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import {
  Bell,
  Bookmark,
  ChartNoAxesColumn,
  Ellipsis,
  Heart,
  House,
  Mail,
  MessageCircle,
  Repeat2,
  Search,
  Settings,
  Upload,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { XLogo } from '../app-icons'
import { useNames } from '../name-context'

type AvatarKind = 'photo' | 'black' | 'default' | 'news'

type Tweet = {
  id: string
  name: string
  handle: string
  time: string
  avatar: AvatarKind
  body: ReactNode
  replies?: number
  retweets?: number
  likes?: number
  views?: string
  card?: ReactNode
}

const TRENDS = ['유우시 여친', '유우시 열애설', '공식입장', '엔시티위시', '유우시 일반인']

function formatCount(n?: number) {
  if (!n) return ''
  if (n >= 10000) return `${Number((n / 10000).toFixed(1))}만`
  return n.toLocaleString('en-US')
}

function Avatar({ kind }: { kind: AvatarKind }) {
  if (kind === 'photo') {
    return (
      <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
        <Image src="/images/profile-3eee.jpeg" alt="" fill sizes="40px" className="object-cover object-[55%_45%]" />
      </span>
    )
  }
  if (kind === 'news') {
    return (
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d7263d] text-[11px] font-black tracking-tight text-white">
        포착
      </span>
    )
  }
  if (kind === 'black') return <span className="size-10 shrink-0 rounded-full bg-black ring-1 ring-black/10" />
  return (
    <span className="flex size-10 shrink-0 items-end justify-center overflow-hidden rounded-full bg-[#cfd9de]">
      <User className="size-[85%] translate-y-[14%] fill-[#8899a6] text-[#8899a6]" strokeWidth={0} />
    </span>
  )
}

function SpinCard() {
  return (
    <div className="relative mt-2 aspect-[1179/677] overflow-hidden rounded-2xl bg-white">
      <Image
        src="/images/spin.jpeg"
        alt="SpinSpin 질문: 누나 유사는 계속 올려줄 거지? 줄건줘. 출처: spin-spin.com"
        fill
        sizes="320px"
        className="object-cover object-bottom"
      />
    </div>
  )
}

function NewsCard() {
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-[#cfd9de] bg-white">
      <div className="relative aspect-[16/10] w-full">
        <Image src="/images/x-article.jpeg" alt="NCT WISH 유우시" fill sizes="320px" className="object-cover object-[50%_20%]" />
      </div>
      <div className="px-3 py-2">
        <p className="text-[13px] text-[#536471]">sesangpochak.co.kr</p>
        <p className="text-[15px] leading-snug text-[#0f1419]">
          {'[단독] NCT WISH 유우시, 일반인 여성과 열애 중… "연습 끝나면 매일 그녀의 집으로"'}
        </p>
      </div>
    </div>
  )
}

function TweetItem({ tweet }: { tweet: Tweet }) {
  return (
    <article className="flex gap-3 border-b border-[#eff3f4] px-4 py-3">
      <Avatar kind={tweet.avatar} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1 text-[15px]">
          <span className="truncate font-bold text-[#0f1419]">{tweet.name}</span>
          <span className="truncate text-[#536471]">@{tweet.handle}</span>
          <span className="text-[#536471]">·</span>
          <span className="shrink-0 text-[#536471]">{tweet.time}</span>
          <Ellipsis className="ml-auto size-4 shrink-0 text-[#536471]" />
        </div>
        <div className="mt-0.5 text-[15px] leading-snug whitespace-pre-line text-[#0f1419]">{tweet.body}</div>
        {tweet.card}
        <div className="mt-3 flex items-center justify-between pr-2 text-[13px] text-[#536471]">
          <span className="flex items-center gap-1">
            <MessageCircle className="size-[18px]" />
            {formatCount(tweet.replies)}
          </span>
          <span className="flex items-center gap-1">
            <Repeat2 className="size-[18px]" />
            {formatCount(tweet.retweets)}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="size-[18px]" />
            {formatCount(tweet.likes)}
          </span>
          <span className="flex items-center gap-1">
            <ChartNoAxesColumn className="size-[18px]" />
            {tweet.views}
          </span>
          <span className="flex items-center gap-3">
            <Bookmark className="size-[18px]" />
            <Upload className="size-[18px]" />
          </span>
        </div>
      </div>
    </article>
  )
}

function Feed() {
  const { englishName } = useNames()
  const [tab, setTab] = useState<'for-you' | 'following'>('for-you')

  // 사용자가 요청한 목록을 "아래에서부터" 쌓기 위해, 화면 위쪽부터는 역순으로 배치합니다.
  const tweets: Tweet[] = [
    {
      id: 'news',
      name: '세상포착',
      handle: 'sesang_pochak',
      time: '1분',
      avatar: 'news',
      body: '[단독] "숙소 대신 그녀의 집으로" NCT WISH 유우시, 일반인 여성과 비밀 연애 중… 연습 끝나면 매일 찾아갔다',
      replies: 2847,
      retweets: 11000,
      likes: 3460,
      views: '182만',
      card: <NewsCard />,
    },
    {
      id: 'ispy',
      name: 'ㅇ',
      handle: 'ispy',
      time: '3분',
      avatar: 'default',
      body: '애초에 얼굴 다 보이는 사진 올렸으면서 이걸 안 들킬 거라고 생각한 건가',
      retweets: 45,
      likes: 111,
      views: '213',
    },
    {
      id: 'algye',
      name: 'ㅋㅋ',
      handle: 'algye',
      time: '5분',
      avatar: 'black',
      body: (
        <>
          유우시 일반인 여친 인스타 <span className="text-[#1d9bf0]">@{englishName}</span>
        </>
      ),
      retweets: 1531,
      likes: 590,
      views: '4.8만',
    },
    {
      id: 'spin',
      name: '3eee..',
      handle: '3eee3_',
      time: '4분',
      avatar: 'photo',
      body: 'ㅅㅂ',
      likes: 3,
      views: '41',
      card: <SpinCard />,
    },
    {
      id: 'ssam',
      name: '쌈',
      handle: 'yu___',
      time: '2분',
      avatar: 'default',
      body: '네? 우리 씨피가 헤게였다고요?',
      retweets: 31,
      likes: 811,
      views: '1.2만',
    },
    { id: 'eung', name: 'ㅇㅇ', handle: 'e_eung', time: '2분', avatar: 'black', body: '응? 구라치지마...', views: '58' },
    { id: 'god', name: '3eee..', handle: '3eee3_', time: '3분', avatar: 'photo', body: '하나님 금방 갑니다', views: '37' },
    { id: 'die', name: '3eee..', handle: '3eee3_', time: '3분', avatar: 'photo', body: '다죽자', views: '29' },
  ]

  return (
    <>
      <header className="sticky top-0 z-10 shrink-0 border-b border-[#eff3f4] bg-white/85 backdrop-blur">
        <div className="relative flex h-11 items-center justify-center px-4">
          <span className="absolute left-4">
            <Avatar kind="default" />
          </span>
          <XLogo className="size-6 text-[#0f1419]" />
          <Settings className="absolute right-4 size-5 text-[#0f1419]" />
        </div>
        <div className="flex" role="tablist">
          {(['for-you', 'following'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                'flex h-12 flex-1 flex-col items-center justify-center text-[15px]',
                tab === t ? 'font-bold text-[#0f1419]' : 'text-[#536471]',
              )}
            >
              <span className="relative">
                {t === 'for-you' ? '추천' : '팔로잉'}
                {tab === t && (
                  <span className="absolute -bottom-3 left-1/2 h-1 w-14 -translate-x-1/2 rounded-full bg-[#1d9bf0]" />
                )}
              </span>
            </button>
          ))}
        </div>
      </header>
      {tweets.map((t) => (
        <TweetItem key={t.id} tweet={t} />
      ))}
    </>
  )
}

function Explore() {
  return (
    <>
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-[#eff3f4] bg-white/85 px-4 py-2 backdrop-blur">
        <Avatar kind="default" />
        <div className="flex h-10 flex-1 items-center gap-2 rounded-full bg-[#eff3f4] px-4 text-[15px] text-[#536471]">
          <Search className="size-4" />
          검색
        </div>
        <Settings className="size-5 text-[#0f1419]" />
      </header>
      <h2 className="px-4 pt-3 pb-1 text-[20px] font-extrabold text-[#0f1419]">실시간 트렌드</h2>
      <ol>
        {TRENDS.map((trend, i) => (
          <li key={trend} className="flex items-start justify-between px-4 py-3">
            <div>
              <p className="text-[13px] text-[#536471]">
                {i + 1} · 대한민국에서 트렌드 중
              </p>
              <p className="text-[15px] font-bold text-[#0f1419]">{trend}</p>
              <p className="text-[13px] text-[#536471]">
                {['12.4만', '8.7만', '5.1만', '3.9만', '2.2��'][i]} 게시물
              </p>
            </div>
            <Ellipsis className="mt-1 size-4 text-[#536471]" />
          </li>
        ))}
      </ol>
    </>
  )
}

const DM_DELAY_MS = 3000
const DM_BANNER_MS = 4500
const DM_TEXT = '님 맞죠?'

function Messages() {
  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center gap-3 border-b border-[#eff3f4] bg-white/85 px-4 backdrop-blur">
        <Avatar kind="default" />
        <h2 className="flex-1 text-[17px] font-bold text-[#0f1419]">메시지</h2>
        <Settings className="size-5 text-[#0f1419]" />
      </header>
      <div className="px-4 py-2">
        <div className="flex h-10 items-center gap-2 rounded-full bg-[#eff3f4] px-4 text-[15px] text-[#536471]">
          <Search className="size-4" />
          다이렉트 메시지 검색
        </div>
      </div>
      <div className="flex items-center gap-3 px-4 py-3" aria-label=". 님의 메시지: 님 맞죠?">
        <span className="size-12 shrink-0 rounded-full bg-black" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[15px]">
            <span className="font-bold text-[#0f1419]">.</span>
            <span className="truncate text-[#536471]">@_______</span>
            <span className="text-[#536471]">·</span>
            <span className="shrink-0 text-[#536471]">지금</span>
          </div>
          <p className="truncate text-[15px] font-bold text-[#0f1419]">{DM_TEXT}</p>
        </div>
        <span className="size-2.5 shrink-0 rounded-full bg-[#1d9bf0]" aria-label="읽지 않음" />
      </div>
    </>
  )
}

function DmBanner() {
  return (
    <div
      role="status"
      className="pointer-events-none absolute inset-x-2 top-2 z-30 flex items-center gap-3 rounded-[22px] bg-white/90 px-3 py-2.5 shadow-lg ring-1 ring-black/5 backdrop-blur-xl animate-in slide-in-from-top-4 fade-in duration-300"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-[9px] bg-black">
        <XLogo className="size-5 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-black">X</p>
          <p className="text-[13px] text-black/50">지금</p>
        </div>
        <p className="truncate text-[15px] text-black">
          <span className="font-semibold">.</span> : {DM_TEXT}
        </p>
      </div>
    </div>
  )
}

export function XApp() {
  const [view, setView] = useState<'home' | 'search' | 'messages'>('home')
  const [showBanner, setShowBanner] = useState(false)
  const [hasUnreadDm, setHasUnreadDm] = useState(false)

  useEffect(() => {
    const showId = setTimeout(() => {
      setShowBanner(true)
      setHasUnreadDm(true)
    }, DM_DELAY_MS)
    const hideId = setTimeout(() => setShowBanner(false), DM_DELAY_MS + DM_BANNER_MS)
    return () => {
      clearTimeout(showId)
      clearTimeout(hideId)
    }
  }, [])

  const openMessages = () => {
    setView('messages')
    setHasUnreadDm(false)
  }

  return (
    <div className="relative flex h-full flex-col bg-white">
      {showBanner && <DmBanner />}
      <div className="flex-1 overflow-y-auto">
        {view === 'home' ? <Feed /> : view === 'search' ? <Explore /> : <Messages />}
      </div>
      <nav aria-label="X 메뉴" className="flex h-12 shrink-0 items-center justify-around border-t border-[#eff3f4] bg-white">
        <button
          type="button"
          onClick={() => setView('home')}
          aria-label="홈"
          aria-current={view === 'home' ? 'page' : undefined}
          className="flex size-11 items-center justify-center text-[#0f1419]"
        >
          <House className={cn('size-6', view === 'home' && 'fill-[#0f1419]')} strokeWidth={view === 'home' ? 2.5 : 2} />
        </button>
        <button
          type="button"
          onClick={() => setView('search')}
          aria-label="검색"
          aria-current={view === 'search' ? 'page' : undefined}
          className="flex size-11 items-center justify-center text-[#0f1419]"
        >
          <Search className="size-6" strokeWidth={view === 'search' ? 3 : 2} />
        </button>
        <span className="flex size-11 items-center justify-center text-[#0f1419]">
          <Bell className="size-6" />
        </span>
        <button
          type="button"
          onClick={openMessages}
          aria-label={hasUnreadDm ? '메시지, 새 메시지 있음' : '메시지'}
          aria-current={view === 'messages' ? 'page' : undefined}
          className="relative flex size-11 items-center justify-center text-[#0f1419]"
        >
          <Mail className="size-6" strokeWidth={view === 'messages' ? 2.75 : 2} />
          {hasUnreadDm && (
            <span className="absolute top-2 right-1.5 size-2.5 rounded-full bg-[#1d9bf0] ring-2 ring-white" />
          )}
        </button>
      </nav>
    </div>
  )
}
