'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  ArrowUp,
  ChevronLeft,
  Ellipsis,
  Menu,
  MessageCircle,
  MessageCirclePlus,
  Pause,
  Play,
  Plus,
  Search,
  Smile,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { casualName, subject } from '@/lib/korean-particles'
import { useNames } from '../name-context'
import { KAKAO_SENDER, kakaoNotificationTexts } from '../kakao-notifications'
import { useKakaoScript, type ScriptMessage } from '../kakao-script'

type KMessage = {
  from: 'me' | 'them'
  time: string
  text?: string
  image?: string
  voice?: string
}

type Section = { date: string; messages: KMessage[] }

type Chat = {
  id: string
  name: string
  unread: number
  listTime: string
  preview: string
  sections: Section[]
}

const WEEKDAYS = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

function todayHeader() {
  const d = new Date()
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${WEEKDAYS[d.getDay()]}`
}

function isToday(year: number, month: number, day: number) {
  const d = new Date()
  return d.getFullYear() === year && d.getMonth() + 1 === month && d.getDate() === day
}

function buildChats(name: string, extra: ScriptMessage[]): Chat[] {
  const lastExtra = extra[extra.length - 1]
  const [late1, late2, late3, late4, late5] = kakaoNotificationTexts(name)

  const soomi: Chat = {
    id: 'soomi',
    name: '쑤미',
    unread: 1,
    listTime: '오전 2:10',
    preview: '야 괜찮음...?',
    sections: [
      {
        date: '2026년 10월 15일 목요일',
        messages: [
          { from: 'them', time: '오후 10:36', text: '노상 캔맥ㄱ' },
          { from: 'me', time: '오후 10:36', text: 'ㅇㅇ gs?' },
          { from: 'them', time: '오후 10:36', text: 'ㅇㅇ' },
        ],
      },
      {
        date: todayHeader(),
        messages: [{ from: 'them', time: '오전 2:10', text: '야 괜찮음...?' }],
      },
    ],
  }

  const yushi: Chat = {
    id: 'yushi',
    name: KAKAO_SENDER,
    unread: 5,
    listTime: isToday(2026, 10, 21) ? (lastExtra?.time ?? '오전 2:12') : '10월 21일',
    preview: lastExtra?.text ?? late5,
    sections: [
      {
        date: '2026년 7월 11일 토요일',
        messages: [
          { from: 'them', time: '오후 9:14', text: `${subject(name)} 준 향수 말해줬어` },
          { from: 'me', time: '오후 9:15', text: '어떤 거?!' },
          { from: 'them', time: '오후 9:15', text: '백일 때 준 거' },
          { from: 'them', time: '오후 9:15', text: '고구마 향 ^_^' },
        ],
      },
      {
        date: '2026년 7월 19일 일요일',
        messages: [
          { from: 'them', time: '오후 3:42', image: '/images/gallery-3.jpeg' },
          { from: 'them', time: '오후 3:42', text: '쉬는 시간 ㅎㅎㅎ' },
          { from: 'me', time: '오후 3:44', text: 'ㅋㅋㅋㅋㅋㅋ' },
          { from: 'me', time: '오후 3:44', text: '보구 싶당 ㅠㅠ' },
          { from: 'them', time: '오후 3:45', text: '전화하자' },
          { from: 'them', time: '오후 3:45', text: '페이스타임 할까' },
          { from: 'me', time: '오후 3:47', text: '이따가! 유우시 숙소 가면 하장' },
          { from: 'them', time: '오후 3:47', text: 'ㅠㅠ' },
        ],
      },
      {
        date: '2026년 8월 7일 금요일',
        messages: [
          { from: 'them', time: '오후 11:02', text: name },
          { from: 'them', time: '오후 11:02', text: '사랑해' },
          { from: 'them', time: '오후 11:02', text: '우리 언제 만나！' },
          { from: 'me', time: '오후 11:05', text: '?' },
          { from: 'me', time: '오후 11:05', text: 'ㅋㅋ 뭔소리야' },
          { from: 'me', time: '오후 11:05', text: '우리 내일 만나잖아' },
          { from: 'them', time: '오후 11:06', text: '알지' },
          { from: 'them', time: '오후 11:06', text: '알어 ㅎㅎ' },
          { from: 'them', time: '오후 11:06', text: '아이타이요' },
  { from: 'them', time: '오후 11:06', text: `그냥 연습 끝나면 ${casualName(name)} 집으로 갈까` },
  { from: 'them', time: '오후 11:09', text: '응?' },
  { from: 'me', time: '오후 11:09', text: '유우시 안 피곤하면 와 ㅎㅎ' },
  { from: 'them', time: '오후 11:09', text: '응 ^_^' },
        ],
      },
      {
        date: '2026년 9월 22일 화요일',
        messages: [
          { from: 'them', time: '오후 4:21', text: '보고 싶네〜' },
          { from: 'me', time: '오후 4:23', text: 'ㅋㅋㅋㅋ 갑자기?!' },
          { from: 'them', time: '오후 4:23', text: '갑자기 ㅎㅎ' },
          { from: 'them', time: '오후 4:24', text: '갑자기라고 하기엔 우리는 계속 사랑한다' },
          { from: 'me', time: '오후 4:25', text: 'ㅋㅋㅋㅋㅋㅋㅋ' },
          { from: 'me', time: '오후 4:25', text: '알았어' },
          { from: 'me', time: '오후 4:25', text: '이따 회사쪽으로 갈 테니까 모자랑 마스크 다 쓰구 나와...' },
          { from: 'them', time: '오후 4:26', text: '🫶🏻' },
        ],
      },
      {
        date: '2026년 10월 20일 화요일',
        messages: [{ from: 'them', time: '오전 1:00', voice: '/media/voice-message.mov' }],
      },
      {
        date: '2026년 10월 21일 수요일',
        messages: [
      { from: 'them', time: '오전 2:11', text: late1 },
      { from: 'them', time: '오전 2:11', text: late2 },
      { from: 'them', time: '오전 2:12', text: late3 },
      { from: 'them', time: '오전 2:12', text: late4 },
      { from: 'them', time: '오전 2:12', text: late5 },
          ...extra,
        ],
      },
    ],
  }

  return [yushi, soomi]
}

const FRIENDS = ['엄마', '쑤미', KAKAO_SENDER]

function KakaoAvatar({ size }: { size: 'lg' | 'md' | 'sm' }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'flex shrink-0 items-end justify-center overflow-hidden bg-[#a6c8e8]',
        size === 'lg' && 'size-[60px] rounded-[22px]',
        size === 'md' && 'size-[50px] rounded-[18px]',
        size === 'sm' && 'size-10 rounded-[15px]',
      )}
    >
      <User className="size-[82%] translate-y-[14%] fill-white text-white" strokeWidth={0} />
    </span>
  )
}

export function KakaoApp() {
  const { koreanName } = useNames()
  const [tab, setTab] = useState<'friends' | 'chats'>('chats')
  const [openId, setOpenId] = useState<string | null>(null)
  const [readIds, setReadIds] = useState<string[]>([])
  const script = useKakaoScript()
  const chats = buildChats(koreanName, script.messages).map((c) => {
    const base = readIds.includes(c.id) ? 0 : c.unread
    const extra = c.id === 'yushi' && script.finalUnread ? 1 : 0
    return { ...c, unread: base + extra }
  })
  const chat = chats.find((c) => c.id === openId)
  const openChat = (id: string) => {
    setOpenId(id)
    setReadIds((ids) => (ids.includes(id) ? ids : [...ids, id]))
    if (id === 'yushi') script.markFinalRead()
  }

  if (chat) return <ChatRoom chat={chat} onBack={() => setOpenId(null)} />

  const totalUnread = chats.reduce((sum, c) => sum + c.unread, 0)

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-5 pb-3">
        <h1 className="text-[22px] font-bold text-black">{tab === 'chats' ? '채팅' : '친구'}</h1>
        <span className="flex items-center gap-4 text-black">
          <Search className="size-6" aria-hidden="true" />
          {tab === 'chats' ? (
            <MessageCirclePlus className="size-6" aria-hidden="true" />
          ) : (
            <UserPlus className="size-6" aria-hidden="true" />
          )}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        {tab === 'chats' ? (
          <ul>
            {chats.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => openChat(c.id)}
                  className="flex min-h-[72px] w-full items-center gap-3 px-5 py-2 text-left active:bg-black/5"
                >
                  <KakaoAvatar size="md" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[16px] font-semibold text-black">{c.name}</span>
                    <span className="block truncate text-[14px] text-black/50">{c.preview}</span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5 self-start pt-1">
                    <span className="text-[12px] text-black/40">{c.listTime}</span>
                    {c.unread > 0 && (
                      <span className="flex h-[19px] min-w-[19px] items-center justify-center rounded-full bg-[#fa5c3c] px-1.5 text-[12px] font-semibold text-white">
                        {c.unread}
                        <span className="sr-only">개 안 읽음</span>
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="flex items-center gap-3 px-5 py-2">
              <KakaoAvatar size="lg" />
              <div>
                <p className="text-[17px] font-semibold text-black">{koreanName}</p>
                <p className="text-[13px] text-black/50">상태메시지를 입력해 주세요</p>
              </div>
            </div>
            <div className="mx-5 my-2 h-px bg-black/10" />
            <p className="px-5 pb-1 text-[12px] text-black/50">친구 {FRIENDS.length}</p>
            <ul>
              {FRIENDS.map((f) => (
                <li key={f} className="flex items-center gap-3 px-5 py-2">
                  <KakaoAvatar size="sm" />
                  <span className="flex-1 text-[16px] text-black">{f}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <nav className="flex h-[52px] shrink-0 items-stretch border-t border-black/10" aria-label="카카오톡 메뉴">
        <button
          type="button"
          onClick={() => setTab('friends')}
          aria-label="친구"
          aria-current={tab === 'friends' ? 'page' : undefined}
          className="flex flex-1 items-center justify-center"
        >
          <Users className={cn('size-6', tab === 'friends' ? 'text-black' : 'text-black/35')} />
        </button>
        <button
          type="button"
          onClick={() => setTab('chats')}
          aria-label={`채팅, 안 읽은 메시지 ${totalUnread}개`}
          aria-current={tab === 'chats' ? 'page' : undefined}
          className="relative flex flex-1 items-center justify-center"
        >
          <MessageCircle className={cn('size-6', tab === 'chats' ? 'fill-black text-black' : 'text-black/35')} />
          {totalUnread > 0 && (
            <span className="absolute top-2 left-1/2 ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#fa5c3c] px-1 text-[10px] font-bold text-white">
              {totalUnread}
            </span>
          )}
        </button>
        <span className="flex flex-1 items-center justify-center">
          <Ellipsis className="size-6 text-black/35" aria-hidden="true" />
        </span>
      </nav>
    </div>
  )
}

function ChatRoom({ chat, onBack }: { chat: Chat; onBack: () => void }) {
  const script = useKakaoScript()
  const scripted = chat.id === 'yushi'
  const { finalUnread, markFinalRead } = script
  useEffect(() => {
    if (scripted && finalUnread) markFinalRead()
  }, [scripted, finalUnread, markFinalRead])
  return (
    <div className="flex h-full flex-col bg-[#bacee0]">
      <header className="flex h-12 shrink-0 items-center gap-1 px-2">
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로"
          className="flex size-11 items-center justify-center text-black"
        >
          <ChevronLeft className="size-7" />
        </button>
        <h2 className="flex-1 truncate text-[17px] font-semibold text-black">{chat.name}</h2>
        <Search className="size-6 text-black" aria-hidden="true" />
        <Menu className="mr-2 ml-4 size-6 text-black" aria-hidden="true" />
      </header>

      <div className="flex flex-1 flex-col-reverse overflow-y-auto px-3 pb-3">
        <div>
          {chat.sections.map((section) => (
            <section key={section.date}>
              <div className="flex justify-center py-4">
                <span className="rounded-full bg-black/15 px-3 py-1 text-[12px] text-white">{section.date}</span>
              </div>
              <div className="flex flex-col">
                {section.messages.map((m, i) => {
                  const prev = section.messages[i - 1]
                  const next = section.messages[i + 1]
                  const firstOfGroup = !prev || prev.from !== m.from
                  const showTime = !next || next.from !== m.from || next.time !== m.time
                  return (
                    <MessageRow
                      key={i}
                      message={m}
                      senderName={chat.name}
                      firstOfGroup={firstOfGroup}
                      showTime={showTime}
                      spaced={Boolean(next) && next.from !== m.from}
                    />
                  )
                })}
              </div>
            </section>
          ))}
          {scripted && script.typing && <TypingRow senderName={chat.name} />}
        </div>
      </div>

      {scripted ? (
        <ReplyBar />
      ) : (
        <div className="flex shrink-0 items-center gap-2 bg-white px-3 py-2">
          <Plus className="size-6 text-black/50" aria-hidden="true" />
          <div className="flex h-9 flex-1 items-center justify-between rounded-full bg-[#f2f2f2] px-3">
            <span className="text-[16px] text-black/30">메시지 입력</span>
            <Smile className="size-5 text-black/40" aria-hidden="true" />
          </div>
          <span className="text-[17px] font-bold text-black/50">#</span>
        </div>
      )}
    </div>
  )
}

function ReplyBar() {
  const script = useKakaoScript()
  const [activated, setActivated] = useState(false)
  const [value, setValue] = useState('')
  const placeholder = activated && script.guide ? script.guide : '메시지 입력'
  const ready = activated && script.canSend

  const submit = () => {
    if (!ready) return
    script.send(value)
    setValue('')
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        submit()
      }}
      className="flex shrink-0 items-center gap-2 bg-white px-3 py-2"
    >
      <Plus className="size-6 shrink-0 text-black/50" aria-hidden="true" />
      <div className="flex h-10 min-w-0 flex-1 items-center gap-2 rounded-full bg-[#f2f2f2] px-3">
        <label htmlFor="kakao-reply" className="sr-only">
          메시지 입력
        </label>
        <input
          id="kakao-reply"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setActivated(true)}
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            if (e.nativeEvent.isComposing || e.keyCode === 229) return
            e.preventDefault()
            submit()
          }}
          placeholder={placeholder}
          autoComplete="off"
          enterKeyHint="send"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-black/35"
        />
        <Smile className="size-5 shrink-0 text-black/40" aria-hidden="true" />
      </div>
      {activated ? (
        <button
          type="submit"
          disabled={!ready}
          onMouseDown={(e) => e.preventDefault()}
          aria-label="전송"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#fee500] text-black transition-opacity disabled:opacity-40"
        >
          <ArrowUp className="size-5" strokeWidth={2.5} />
        </button>
      ) : (
        <span className="flex size-11 shrink-0 items-center justify-center text-[17px] font-bold text-black/50">
          #
        </span>
      )}
    </form>
  )
}

function TypingRow({ senderName }: { senderName: string }) {
  return (
    <div className="mb-1 flex gap-2" role="status" aria-label={`${senderName} 입력 중`}>
      <div className="w-10 shrink-0">
        <KakaoAvatar size="sm" />
      </div>
      <div>
        <p className="mb-1 text-[12px] text-black/70">{senderName}</p>
        <div className="flex h-[34px] items-center gap-1 rounded-[16px] rounded-tl-[4px] bg-white px-3.5">
          {[0, 150, 300].map((delay) => (
            <span
              key={delay}
              className="size-1.5 animate-bounce rounded-full bg-black/35"
              style={{ animationDelay: `${delay}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function MessageRow({
  message: m,
  senderName,
  firstOfGroup,
  showTime,
  spaced,
}: {
  message: KMessage
  senderName: string
  firstOfGroup: boolean
  showTime: boolean
  spaced: boolean
}) {
  const mine = m.from === 'me'
  const time = showTime ? <span className="shrink-0 pb-0.5 text-[10px] text-black/45">{m.time}</span> : null

  const content = m.image ? (
    <Image
      src={m.image}
      alt="유우시가 보낸 사진: 검은 바지와 흰 운동화를 신은 발"
      width={2212}
      height={1659}
      sizes="220px"
      className="h-auto w-[220px] rounded-[14px]"
    />
  ) : m.voice ? (
    <VoiceBubble src={m.voice} />
  ) : (
    <p
      className={cn(
        'rounded-[16px] px-3 py-[7px] text-[15px] leading-snug break-words whitespace-pre-wrap text-black',
        mine ? 'bg-[#fee500]' : 'bg-white',
        firstOfGroup && (mine ? 'rounded-tr-[4px]' : 'rounded-tl-[4px]'),
      )}
    >
      {m.text}
    </p>
  )

  if (mine) {
    return (
      <div className={cn('flex items-end justify-end gap-1.5', spaced ? 'mb-3' : 'mb-1')}>
        {time}
        <div className="max-w-[72%]">{content}</div>
      </div>
    )
  }

  return (
    <div className={cn('flex gap-2', spaced ? 'mb-3' : 'mb-1')}>
      <div className="w-10 shrink-0">{firstOfGroup && <KakaoAvatar size="sm" />}</div>
      <div className="min-w-0 flex-1">
        {firstOfGroup && <p className="mb-1 text-[12px] text-black/70">{senderName}</p>}
        <div className="flex items-end gap-1.5">
          <div className="max-w-[78%]">{content}</div>
          {time}
        </div>
      </div>
    </div>
  )
}

function formatSeconds(total: number) {
  const s = Math.max(0, Math.round(total))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

function VoiceBubble({ src }: { src: string }) {
  const mediaRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [current, setCurrent] = useState(0)

  const toggle = () => {
    const media = mediaRef.current
    if (!media) return
    if (media.paused) media.play().catch(() => {})
    else media.pause()
  }

  const progress = duration ? current / duration : 0

  return (
    <div className="flex w-[200px] items-center gap-2.5 rounded-[16px] rounded-tl-[4px] bg-white px-3 py-2.5">
      {/* Video file is used only as an audio source; nothing is rendered visually. */}
      <video
        ref={mediaRef}
        src={src}
        playsInline
        preload="metadata"
        className="hidden"
        aria-hidden="true"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false)
          setCurrent(0)
        }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? '음성 메시지 일시정지' : '음성 메시지 재생'}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#3c1e1e] text-[#fee500]"
      >
        {playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="h-1 overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-[#3c1e1e]" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="mt-1 text-[12px] text-black/55 tabular-nums">
          {playing || current > 0 ? formatSeconds(current) : formatSeconds(duration)}
        </p>
      </div>
    </div>
  )
}
