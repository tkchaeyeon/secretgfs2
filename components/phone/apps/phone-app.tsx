'use client'

import { useState } from 'react'
import { Info, PhoneOutgoing } from 'lucide-react'
import { cn } from '@/lib/utils'

type Call = {
  id: string
  name: string
  count: number
  missed: boolean
  kind: string
  when: string
  date: string
}

const YUSHI = '유 우 시💕'

const BASE_CALLS: Call[] = [
  { id: 'yushi', name: YUSHI, count: 5, missed: true, kind: '휴대전화', when: '오전 2:31', date: '10월 21일' },
  { id: 'mom', name: '엄마', count: 1, missed: false, kind: '휴대전화', when: '어제', date: '10월 20일' },
  { id: 'yushi-1002', name: YUSHI, count: 1, missed: false, kind: '휴대전화 · 1시간', when: '10월 2일', date: '10월 2일' },
]

function getCalls(callOutcome: 'answered' | 'missed' | null): Call[] {
  if (callOutcome === 'missed') {
    return BASE_CALLS.map((c) => (c.id === 'yushi' ? { ...c, count: 6, when: '오후 2:43' } : c))
  }
  if (callOutcome === 'answered') {
    return [
      { id: 'yushi-answered', name: YUSHI, count: 1, missed: false, kind: '휴대전화 · 5초', when: '오전 2:43', date: '10월 21일' },
      ...BASE_CALLS,
    ]
  }
  return BASE_CALLS
}

export function PhoneApp({ callOutcome = null }: { callOutcome?: 'answered' | 'missed' | null }) {
  const [filter, setFilter] = useState<'all' | 'missed'>('all')
  const calls = getCalls(callOutcome)
  const list = filter === 'all' ? calls : calls.filter((c) => c.missed)

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex shrink-0 items-center justify-center px-4 pb-2">
        <div className="flex rounded-[9px] bg-[#767680]/12 p-0.5 text-[13px] font-medium" role="tablist">
          {(['all', 'missed'] as const).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'h-8 w-24 rounded-[7px] transition-colors',
                filter === f ? 'bg-white shadow-sm' : 'text-black/80',
              )}
            >
              {f === 'all' ? '모두' : '부재중'}
            </button>
          ))}
        </div>
      </div>
      <h1 className="px-4 pt-1 pb-2 text-[34px] font-bold text-black">최근 통화</h1>
      <ul className="flex-1 overflow-y-auto">
        {list.map((call) => (
          <li key={call.id} className="flex items-center gap-3 pl-4">
            <PhoneOutgoing className={cn('size-4 shrink-0', call.missed ? 'invisible' : 'text-black/40')} />
            <div className="flex min-h-[60px] flex-1 items-center gap-2 border-b border-black/10 py-2 pr-4">
              <div className="min-w-0 flex-1">
                <p className={cn('truncate text-[17px] font-semibold', call.missed ? 'text-[#ff3b30]' : 'text-black')}>
                  {call.name}
                  {call.count > 1 && ` (${call.count})`}
                </p>
                <p className="text-[14px] text-black/50">{call.kind}</p>
              </div>
              <span className="text-[15px] text-black/50">{call.when}</span>
              <span className="sr-only">{call.date}</span>
              <Info className="size-6 text-[#007aff]" aria-label="정보" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
