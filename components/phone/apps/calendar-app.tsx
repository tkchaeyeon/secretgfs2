'use client'

import { useState } from 'react'
import { Plus, Search, Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useToday } from '../calendar-icon-date'

type CalEvent = {
  id: string
  title: string
  month: number
  start: number
  end: number
  kind: 'trip' | 'holiday'
}

const EVENTS: CalEvent[] = [
  { id: 'trip', title: '500일 여행 💕🪽', month: 9, start: 15, end: 17, kind: 'trip' },
  { id: 'chuseok', title: '추석', month: 9, start: 24, end: 26, kind: 'holiday' },
  { id: 'gaecheon', title: '개천절', month: 10, start: 3, end: 3, kind: 'holiday' },
  { id: 'gaecheon-sub', title: '개천절(대체 휴일)', month: 10, start: 5, end: 5, kind: 'holiday' },
  { id: 'hangul', title: '한글날', month: 10, start: 9, end: 9, kind: 'holiday' },
]

const COLORS = {
  trip: { bar: 'bg-[#ff7eb6]/25 text-[#c2185b]', index: 'bg-[#ff4f9a]', text: 'text-[#ff4f9a]' },
  holiday: { bar: 'bg-[#ff9500]/20 text-[#c25e00]', index: 'bg-[#ff9500]', text: 'text-[#ff9500]' },
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const YEAR = 2026

function buildWeeks(month: number) {
  const firstDay = new Date(YEAR, month - 1, 1).getDay()
  const daysInMonth = new Date(YEAR, month, 0).getDate()
  const cells: (number | null)[] = [...Array(firstDay).fill(null)]
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7) cells.push(null)
  const weeks: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
  return weeks
}

function eventsOn(month: number, day: number) {
  return EVENTS.filter((e) => e.month === month && day >= e.start && day <= e.end)
}

function formatRange(e: CalEvent) {
  const weekday = (d: number) => WEEKDAYS[new Date(YEAR, e.month - 1, d).getDay()]
  if (e.start === e.end) return `${YEAR}년 ${e.month}월 ${e.start}일 (${weekday(e.start)})`
  return `${YEAR}년 ${e.month}월 ${e.start}일 (${weekday(e.start)}) – ${e.end}일 (${weekday(e.end)})`
}

export function CalendarApp() {
  const [starred, setStarred] = useState<Set<string>>(new Set())
  const [selected, setSelected] = useState<CalEvent | null>(null)
  const today = useToday()
  const isThisYear = today?.getFullYear() === YEAR
  const todayMonth = isThisYear ? today.getMonth() + 1 : null
  const todayDate = isThisYear ? today.getDate() : null
  const lastMonth = Math.max(10, todayMonth ?? 10)
  const months = Array.from({ length: lastMonth - 8 }, (_, i) => 9 + i)

  const openEvent = (e: CalEvent) => {
    if (e.kind === 'holiday') setStarred((prev) => new Set(prev).add(e.id))
    setSelected(e)
  }

  return (
    <div className="relative flex h-full flex-col bg-white">
      <div className="flex shrink-0 items-center justify-between px-4 pb-1">
        <span className="text-[17px] text-[#ff3b30]">{YEAR}년</span>
        <div className="flex items-center gap-1 text-[#ff3b30]">
          <span className="flex size-10 items-center justify-center">
            <Search className="size-5" />
          </span>
          <span className="flex size-10 items-center justify-center">
            <Plus className="size-6" />
          </span>
        </div>
      </div>
      <div className="grid shrink-0 grid-cols-7 border-b border-black/10 pb-1.5 text-center text-[11px] text-black/50">
        {WEEKDAYS.map((w, i) => (
          <span key={w} className={cn(i === 0 && 'text-[#ff3b30]')}>
            {w}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {months.map((month) => (
          <section key={month} aria-label={`${YEAR}년 ${month}월`}>
            <h2 className="px-4 pt-4 pb-1 text-[26px] font-bold text-black">{month}월</h2>
            {buildWeeks(month).map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 border-t border-black/5">
                {week.map((day, di) => {
                  if (!day) return <div key={di} className="h-[74px]" />
                  const dayEvents = eventsOn(month, day)
                  const isHoliday = di === 0 || dayEvents.some((e) => e.kind === 'holiday')
                  return (
                    <div key={di} className="flex h-[74px] flex-col pt-1">
                      <span
                        className={cn(
                          'mx-auto flex size-7 items-center justify-center text-[16px]',
                          isHoliday ? 'text-[#ff3b30]' : 'text-black',
                          month === todayMonth && day === todayDate && 'rounded-full bg-[#ff3b30] font-semibold text-white',
                        )}
                      >
                        {day}
                      </span>
                      <div className="mt-0.5 flex flex-col gap-0.5">
                        {dayEvents.map((e) => {
                          const isStart = day === e.start || di === 0
                          const isEnd = day === e.end || di === 6
                          return (
                            <button
                              type="button"
                              key={e.id}
                              onClick={() => openEvent(e)}
                              className={cn(
                                'relative flex h-[18px] items-center overflow-hidden text-[10px] leading-none font-semibold whitespace-nowrap',
                                COLORS[e.kind].bar,
                                isStart ? 'ml-0.5 rounded-l-[4px] pl-1.5' : 'pl-1',
                                isEnd ? 'mr-0.5 rounded-r-[4px]' : '',
                              )}
                              aria-label={e.title}
                            >
                              {isStart && (
                                <span className={cn('absolute inset-y-0 left-0 w-[3px]', COLORS[e.kind].index)} />
                              )}
                              {isStart && (
                                <span className="truncate">
                                  {starred.has(e.id) && '★ '}
                                  {e.title}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </section>
        ))}
      </div>

      {selected && (
        <div className="absolute inset-0 z-10 flex items-end bg-black/30" onClick={() => setSelected(null)}>
          <div
            className="w-full rounded-t-[20px] bg-white px-5 pt-3 pb-8 animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={selected.title}
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-black/15" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <span className={cn('mt-1 w-1 self-stretch rounded-full', COLORS[selected.kind].index)} />
                <div>
                  <h3 className="text-[22px] font-bold text-black">{selected.title}</h3>
                  <p className="mt-1 text-[14px] text-black/60">{formatRange(selected)}</p>
                  <p className={cn('mt-1 text-[13px] font-medium', COLORS[selected.kind].text)}>
                    {selected.kind === 'trip' ? '하루 종일 · 개인' : '하루 종일 · 대한민국 공휴일'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black/5"
                aria-label="닫기"
              >
                <X className="size-4" />
              </button>
            </div>
            {selected.kind === 'holiday' && (
              <div className="mt-6 flex justify-center">
                <Star
                  key={selected.id}
                  className="size-20 fill-[#ff9500] text-[#ff9500] animate-in zoom-in-0 spin-in-90 duration-500"
                  aria-label="별"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
