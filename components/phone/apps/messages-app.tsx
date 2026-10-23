'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUp, ChevronLeft, ChevronRight, Plus, Search, SquarePen, User, Video } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = { from: 'me' | 'them'; text?: string; image?: string }

type Thread = {
  id: string
  name: string
  preview: string
  listDate: string
  dateHeader: string
  messages: Message[]
}

const THREADS: Thread[] = [
  {
    id: 'yushi',
    name: '유 우 시💕',
    preview: '응 잘자〜^_^',
    listDate: '2026. 10. 2.',
    dateHeader: '2026년 10월 2일 (금) 오전 1:12',
    messages: [
      { from: 'them', image: '/images/lyrics.jpeg' },
      { from: 'me', text: 'ㅋㅋㅋㅋ 알았어 ㅜㅜ' },
      { from: 'me', text: '사랑해' },
      { from: 'them', text: '응 잘자〜^_^' },
    ],
  },
  {
    id: 'mom',
    name: '엄마',
    preview: 'ㅇ',
    listDate: '2026. 8. 29.',
    dateHeader: '2026년 8월 29일 (토) 오후 2:03',
    messages: [
      { from: 'them', text: '언제와' },
      { from: 'me', text: '5시에 도착행' },
      { from: 'me', text: '택시타고 갈겡' },
      { from: 'them', text: 'ㅇ' },
    ],
  },
]

function Avatar({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-end justify-center overflow-hidden rounded-full bg-gradient-to-b from-[#a5abb8] to-[#858994]',
        size === 'md' ? 'size-11' : 'size-14',
      )}
      aria-hidden="true"
    >
      <User className="size-[80%] translate-y-[12%] fill-white text-white" strokeWidth={0} />
    </span>
  )
}

export function MessagesApp() {
  const [openId, setOpenId] = useState<string | null>(null)
  const thread = THREADS.find((t) => t.id === openId)

  if (thread) return <ChatView thread={thread} onBack={() => setOpenId(null)} />

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between px-4 text-[17px] text-[#007aff]">
        <span>편집</span>
        <SquarePen className="size-6" aria-label="새로운 메시지" />
      </div>
      <h1 className="px-4 pt-1 text-[34px] font-bold text-black">메시지</h1>
      <div className="px-4 pt-1 pb-2">
        <div className="flex h-9 items-center gap-2 rounded-[10px] bg-[#767680]/12 px-2 text-black/40">
          <Search className="size-4" />
          <span className="text-[16px]">검색</span>
        </div>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {THREADS.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => setOpenId(t.id)}
              className="flex w-full items-center gap-3 pl-4 text-left active:bg-black/5"
            >
              <Avatar />
              <div className="flex min-h-[76px] min-w-0 flex-1 flex-col justify-center border-b border-black/10 py-2 pr-4">
                <div className="flex items-center gap-2">
                  <span className="flex-1 truncate text-[17px] font-semibold text-black">{t.name}</span>
                  <span className="text-[15px] text-black/45">{t.listDate}</span>
                  <ChevronRight className="size-4 text-black/30" />
                </div>
                <p className="truncate text-[15px] text-black/50">{t.preview}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ChatView({ thread, onBack }: { thread: Thread; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex shrink-0 items-start justify-between border-b border-black/10 bg-[#f9f9f9] px-2 pb-2">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center text-[#007aff]"
          aria-label="뒤로"
        >
          <ChevronLeft className="size-7" />
        </button>
        <div className="flex flex-col items-center gap-1">
          <Avatar size="lg" />
          <span className="flex items-center text-[12px] text-black">
            {thread.name}
            <ChevronRight className="size-3 text-black/40" />
          </span>
        </div>
        <span className="flex size-11 items-center justify-center text-[#007aff]">
          <Video className="size-6" />
        </span>
      </header>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <p className="mb-3 text-center text-[11px] font-medium text-black/45">{thread.dateHeader}</p>
        <div className="flex flex-col gap-[3px]">
          {thread.messages.map((m, i) => {
            const next = thread.messages[i + 1]
            const isLastOfGroup = !next || next.from !== m.from
            if (m.image) {
              return (
                <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start', isLastOfGroup && 'mb-2')}>
                  <Image
                    src={m.image}
                    alt="Dancing King - Yu Jae Seok & EXO 가사 공유: Ah 짜증나는 일들 모두 잊고 싶을 때 고민 말고 그냥 나를 찾아오면 돼"
                    width={1179}
                    height={525}
                    className="h-auto w-full"
                  />
                </div>
              )
            }
            return (
              <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start', isLastOfGroup && 'mb-2')}>
                <p
                  className={cn(
                    'max-w-[75%] rounded-[18px] px-3 py-[7px] text-[17px] leading-snug',
                    m.from === 'me' ? 'bg-[#007aff] text-white' : 'bg-[#e9e9eb] text-black',
                    isLastOfGroup && (m.from === 'me' ? 'rounded-br-[5px]' : 'rounded-bl-[5px]'),
                  )}
                >
                  {m.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 px-3 pt-1 pb-2">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#e9e9eb] text-black/50">
          <Plus className="size-5" />
        </span>
        <div className="flex h-9 flex-1 items-center justify-between rounded-full border border-black/15 pr-1 pl-3 text-[16px] text-black/30">
          iMessage
          <span className="flex size-7 items-center justify-center rounded-full bg-black/10 text-white">
            <ArrowUp className="size-4" />
          </span>
        </div>
      </div>
    </div>
  )
}
